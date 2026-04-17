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
  
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    const fetchStoryAndVocab = async () => {
      if (!id) return;
      
      // 1. Get current authenticatd user
      const { data: { session } } = await supabase.auth.getSession();
      let currentUser = null;
      if (session) {
        currentUser = session.user;
        setSessionUser(currentUser);
      }
      
      // 2. Fetch the story
      const { data: storyData, error: storyErr } = await supabase.from('stories').select('*').eq('id', id).single();
      if (storyErr) console.error('Error fetching story:', storyErr);
      else setStory(storyData);
      
      // 3. Fetch vocabulary and progress
      if (storyData && storyData.words && storyData.words.length > 0) {
        const { data: vocabData, error: vocabErr } = await supabase.from('vocabulary').select('*').in('word', storyData.words);
        if (vocabErr) console.error('Error fetching vocab:', vocabErr);
        else {
          const vocabRecord: Record<string, any> = {};
          vocabData?.forEach(v => vocabRecord[v.word] = { ...v, videoId: v.video_id });
          setVocabularyMap(vocabRecord);
        }
        
        // Fetch learned progress for this user
        if (currentUser) {
          const { data: progressData, error: progressErr } = await supabase
            .from('user_vocabulary')
            .select('word')
            .eq('user_id', currentUser.id)
            .in('word', storyData.words);
            
          if (!progressErr && progressData) {
            setLearnedWords(progressData.map(p => p.word));
          }
        }
      }
      
      setLoading(false);
    };
    fetchStoryAndVocab();
  }, [id]);

  const handleToggleLearned = async (word: string) => {
    if (!sessionUser) return;
    
    const isLearned = learnedWords.includes(word);
    
    try {
      if (isLearned) {
        // Unmark
        await supabase.from('user_vocabulary').delete().match({ user_id: sessionUser.id, word });
        setLearnedWords(prev => prev.filter(w => w !== word));
      } else {
        // Mark learned
        await supabase.from('user_vocabulary').insert({ user_id: sessionUser.id, word });
        setLearnedWords(prev => [...prev, word]);
      }
    } catch (err) {
      console.error('Failed to toggle learned state:', err);
    }
  };

  // Function to parse the story text and inject Tooltips for keywords
  const renderContent = useMemo(() => {
    if (!story) return null;
    
    const vocabKeys = Object.keys(vocabularyMap);
    if (vocabKeys.length === 0) return <span>{story.content}</span>;
    // Sort keys by length descending to match longer phrases first
    vocabKeys.sort((a, b) => b.length - a.length);
    
    // Create a regex to match keywords wrapped in underscores, e.g., _keyword_
    // Using a capture group inside the underscores ensures they are removed from the split array!
    const escapedKeys = vocabKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`_(${escapedKeys.join('|')})_`, 'g');
    
    // Split the text by the keywords
    const parts = story.content.split(regex);
    
    return parts.map((part, index) => {
      if (vocabKeys.includes(part)) {
        return (
          <SignTooltip 
            key={index} 
            word={part} 
            vocabInfo={vocabularyMap[part]} 
            isLearned={learnedWords.includes(part)}
            onToggleLearned={sessionUser ? handleToggleLearned : undefined}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [story, vocabularyMap, learnedWords, sessionUser]);

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
        
        @media (max-width: 600px) {
          .reader-content-box {
            padding: 24px 16px;
          }
          .story-text {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};
