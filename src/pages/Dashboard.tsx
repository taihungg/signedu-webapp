import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Story } from '../lib/mockData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'new' | 'all'>('new');
  
  // Streak state
  const [streakDays, setStreakDays] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      // Get session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Handle consecutive streak days using localStorage
        const lastLoginStr = localStorage.getItem('lastLoginDate');
        let currentStreak = parseInt(localStorage.getItem('userStreak') || '0', 10);
        const today = new Date().toDateString();
        
        if (lastLoginStr !== today) {
           const lastLogin = new Date(lastLoginStr || '');
           const yesterdayDate = new Date();
           yesterdayDate.setDate(yesterdayDate.getDate() - 1);
           
           if (lastLogin.toDateString() === yesterdayDate.toDateString()) {
              currentStreak += 1;
           } else if (!lastLoginStr) {
              currentStreak = 1;
           } else {
              currentStreak = 1; // Broken streak
           }
           localStorage.setItem('lastLoginDate', today);
           localStorage.setItem('userStreak', currentStreak.toString());
        }
        setStreakDays(currentStreak);
      }

      // Fetch stories
      const { data, error } = await supabase.from('stories').select('*').order('chapter', { ascending: true });
      if (error) console.error('Error fetching stories:', error);
      else setStories(data || []);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-page container animate-fade-in">
      <div className="dashboard-header">
        <h1>Bài học ngôn ngữ ký hiệu</h1>
        <p>Chọn bài học để bắt đầu học ngôn ngữ ký hiệu qua các câu chuyện thực tế.</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          Bài học mới nhất
        </button>
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
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
            <p className="streak-count">Bạn đang có: <strong>{streakDays} ngày liên tiếp</strong></p>
            <div className="fire-emojis">
              {Array.from({ length: Math.min(streakDays, 7) }).map((_, i) => (
                <span key={i}>🔥 </span>
              ))}
              {streakDays === 0 && <span className="text-muted" style={{ fontSize: '1rem', letterSpacing: 'normal' }}>Học ngay hôm nay nhé!</span>}
            </div>
            <p className="streak-sub">Giữ streak để không bị mất</p>
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
      `}</style>
    </div>
  );
};
