import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { SignTooltip } from '../components/story/SignTooltip';
import type { Story } from '../lib/mockData';

export const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [story, setStory] = useState<Story | null>(null);
  const [vocabularyMap, setVocabularyMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryAndVocab = async () => {
      if (!id) return;
      
      const { data: storyData, error: storyErr } = await supabase.from('stories').select('*').eq('id', id).single();
      if (storyErr) console.error('Error fetching story:', storyErr);
      else setStory(storyData);
      
      if (storyData && storyData.words && storyData.words.length > 0) {
        const { data: vocabData, error: vocabErr } = await supabase.from('vocabulary').select('*').in('word', storyData.words);
        if (vocabErr) console.error('Error fetching vocab:', vocabErr);
        else {
          const vocabRecord: Record<string, any> = {};
          vocabData?.forEach(v => vocabRecord[v.word] = { ...v, videoId: v.video_id });
          setVocabularyMap(vocabRecord);
        }
      }
      
      setLoading(false);
    };
    fetchStoryAndVocab();
  }, [id]);

  // Function to parse the story text and inject Tooltips for keywords
  const renderContent = useMemo(() => {
    if (!story) return null;
    
    const vocabKeys = Object.keys(vocabularyMap);
    if (vocabKeys.length === 0) return <span>{story.content}</span>;
    // Sort keys by length descending to match longer phrases first (e.g., 'Anh trai' before 'Anh')
    vocabKeys.sort((a, b) => b.length - a.length);
    
    // Create a regex to match any of the keywords
    const regex = new RegExp(`(${vocabKeys.join('|')})`, 'g');
    
    // Split the text by the keywords
    const parts = story.content.split(regex);
    
    return parts.map((part, index) => {
      if (vocabKeys.includes(part)) {
        return <SignTooltip key={index} word={part} vocabInfo={vocabularyMap[part]} />;
      }
      return <span key={index}>{part}</span>;
    });
  }, [story, vocabularyMap]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px' }}>
        <h2>Đang tải bài học...</h2>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container" style={{ padding: '40px' }}>
        <h2>Không tìm thấy bài học</h2>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Quay lại Dashboard</button>
      </div>
    );
  }

  return (
    <div className="reader-page container animate-fade-in">
      <div className="reader-header flex-between">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} /> Quay lại
        </button>
        <span className="chapter-badge badge badge-full">
          Chương {story.chapter} / {story.totalChapters}
        </span>
      </div>

      <div className="reader-hero">
        <h1>{story.title}</h1>
        <p className="reader-desc">{story.description}</p>
      </div>

      <div className="reader-content-box glass-panel">
        <div className="reader-instruction flex-center">
          <PlayCircle size={20} color="var(--primary)" />
          <p>Nhấn vào các từ được in đậm và gạch chân để xem video hướng dẫn ngôn ngữ ký hiệu.</p>
        </div>
        
        <div className="story-text">
          {renderContent}
        </div>
      </div>

      <div className="reader-footer flex-between">
        <div className="progress-info">
          Tiến trình bài học: <strong>{story.wordsLearned}/{story.totalWords}</strong> từ đã học
        </div>
        <button className="btn btn-primary">
          Hoàn thành bài học
        </button>
      </div>

      <style>{`
        .reader-page {
          padding: 32px 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .reader-header {
          margin-bottom: 32px;
        }
        .btn-back {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-back:hover {
          color: var(--primary-hover);
        }
        .chapter-badge {
          background-color: var(--secondary-light);
          color: #854d0e;
          border: 1px solid var(--secondary);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        
        .reader-hero {
          margin-bottom: 32px;
          text-align: center;
        }
        .reader-hero h1 {
          font-size: 2.5rem;
          color: #4338ca;
          margin-bottom: 12px;
        }
        .reader-desc {
          font-size: 1.1rem;
        }
        
        .reader-content-box {
          padding: 40px;
          margin-bottom: 32px;
          background: #ffffff;
          box-shadow: var(--shadow-md);
        }
        
        .reader-instruction {
          justify-content: flex-start;
          gap: 12px;
          padding: 12px 16px;
          background-color: var(--primary-light);
          border-radius: var(--radius-sm);
          margin-bottom: 32px;
          color: #0369a1;
          font-weight: 500;
        }
        .reader-instruction p {
          margin: 0;
          color: inherit;
        }
        
        .story-text {
          font-size: 1.5rem;
          line-height: 1.8;
          color: var(--text-main);
        }
        
        .reader-footer {
          padding: 24px;
          background: #fff;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .progress-info {
          font-size: 1.1rem;
          color: var(--text-muted);
        }
        .progress-info strong {
          color: var(--success);
        }
        
        @media (max-width: 600px) {
          .reader-content-box {
            padding: 24px 16px;
          }
          .story-text {
            font-size: 1.25rem;
          }
          .reader-footer {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
