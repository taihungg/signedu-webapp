import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, CheckCircle, PlaySquare, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Story } from '../lib/mockData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase.from('stories').select('*').order('chapter', { ascending: true });
      if (error) console.error('Error fetching stories:', error);
      else setStories(data || []);
      setLoading(false);
    };
    fetchStories();
  }, []);

  return (
    <div className="dashboard-page container animate-fade-in">
      <div className="dashboard-header">
        <h1>Bài học ngôn ngữ ký hiệu</h1>
        <p>Chọn bài học để bắt đầu học ngôn ngữ ký hiệu qua các câu chuyện thực tế.</p>
      </div>

      <div className="dashboard-tabs">
        <button className="tab active">Bài học mới nhất</button>
        <button className="tab">Tất cả</button>
      </div>

      <div className="dashboard-grid">
        <div className="story-list">
          {loading ? (
            <p>Đang tải bài học...</p>
          ) : stories.length === 0 ? (
            <p>Chưa có bài học nào. Vui lòng chạy SQL Editor trong Supabase!</p>
          ) : (
            stories.map(story => (
              <div key={story.id} className="story-card glass-panel" onClick={() => navigate(`/story/${story.id}`)}>
                <div className="story-card-badges">
                  {story.isNew && <span className="badge badge-new">MỚI</span>}
                </div>
                <div className="story-card-content">
                  <div className="story-meta">
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                  </div>
                  <div className="story-stats">
                    <span className="chapter-label">Chương {story.chapter} <span className="badge badge-full">Full</span></span>
                    <div className="progress-dots">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span key={i} className={`dot ${i < 2 ? 'dot-active' : ''}`} />
                      ))}
                    </div>
                    <span className="words-learned">{story.wordsLearned}/{story.totalWords} từ đã học</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sidebar">
          <div className="sidebar-widget glass-panel streak-widget">
            <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
              <Flame color="#ef4444" fill="#ef4444" size={24} /> Chuỗi học tập
            </h3>
            <p className="streak-count">Bạn đang có: <strong>5 ngày liên tiếp</strong></p>
            <div className="fire-emojis">🔥 🔥 🔥 🔥 🔥</div>
            <p className="streak-sub">Giữ streak để không bị mất</p>
          </div>

          <div className="sidebar-widget glass-panel review-widget">
            <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
              <BookOpen size={20} className="text-secondary" /> Ôn tập hôm nay
            </h3>
            <p>Bạn có <strong>6 từ</strong> cần ôn</p>
            <button className="btn btn-secondary review-btn">Bắt đầu ôn tập</button>
            
            <div className="flashcard-preview">
              <span className="text-muted">Flashcard 1/6</span>
              <div className="flashcard">
                <h4>Xin chào</h4>
                <button className="btn btn-outline flip-btn">Lật thẻ</button>
              </div>
              <div className="flashcard-actions">
                <button className="btn btn-success"><CheckCircle size={16}/> Đã nhớ</button>
                <button className="btn btn-danger"><PlaySquare size={16}/> Chưa nhớ</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          padding: 40px 20px;
        }
        .dashboard-header {
          margin-bottom: 24px;
        }
        .dashboard-header h1 {
          color: #4338ca;
          font-size: 2.2rem;
        }
        .dashboard-tabs {
          display: flex;
          gap: 24px;
          border-bottom: 2px solid var(--border-color);
          margin-bottom: 32px;
        }
        .tab {
          padding: 12px 0;
          background: none;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
        }
        .tab.active {
          color: #4338ca;
        }
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #4338ca;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .story-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .story-card {
          display: flex;
          padding: 16px;
          cursor: pointer;
          transition: var(--transition);
          background: #fafafa;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        .story-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
          border-color: var(--primary);
        }
        
        .story-card-badges {
          padding-right: 16px;
        }
        .badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .badge-new {
          background-color: #fef08a; /* yellow-200 */
          color: #854d0e; /* yellow-800 */
        }
        .badge-full {
          background-color: #dcfce7; /* green-100 */
          color: #166534; /* green-800 */
          border: 1px solid #86efac;
        }
        
        .story-card-content {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        }
        .story-meta h3 {
          font-size: 1.25rem;
          color: #4338ca;
          margin-bottom: 4px;
        }
        .story-stats {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .chapter-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .progress-dots {
          display: flex;
          gap: 4px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e2e8f0;
        }
        .dot-active {
          background: #4ade80;
        }
        .words-learned {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-widget {
          padding: 24px;
          background: #fff;
        }
        .fire-emojis {
          font-size: 1.5rem;
          margin: 12px 0;
          letter-spacing: 4px;
        }
        .streak-count {
          margin-top: 12px;
          font-size: 1.1rem;
        }
        .streak-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .review-widget h3 {
          color: #4338ca;
          margin-bottom: 8px;
        }
        .review-btn {
          width: 100%;
          margin: 16px 0;
          background-color: #fde047; /* yellow */
          box-shadow: 0 4px 0 #ca8a04;
          transform: translateY(0);
        }
        .review-btn:hover {
          box-shadow: 0 2px 0 #ca8a04;
          transform: translateY(2px);
        }
        
        .flashcard-preview {
          background: var(--bg-color);
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .flashcard {
          background: #fff;
          padding: 24px 0;
          text-align: center;
          border-radius: var(--radius-sm);
          margin: 12px 0;
          box-shadow: var(--shadow-sm);
        }
        .flashcard h4 {
          font-size: 1.5rem;
          color: #4338ca;
          margin-bottom: 12px;
        }
        .flip-btn {
          background: #eef2ff;
          border: none;
          color: #4338ca;
          padding: 8px 32px;
        }
        
        .flashcard-actions {
          display: flex;
          gap: 8px;
        }
        .btn-success { background: #22c55e; color: #fff; border: none; flex: 1; }
        .btn-danger { background: #ef4444; color: #fff; border: none; flex: 1; }
        
        .text-secondary { color: var(--secondary-hover); }
      `}</style>
    </div>
  );
};
