import React, { useState } from 'react';
import type { Vocabulary } from '../../lib/mockData';
import { X, PlayCircle, CheckCircle, Circle } from 'lucide-react';

interface SignTooltipProps {
  word: string;
  vocabInfo: Vocabulary | null;
  isLearned?: boolean;
  onToggleLearned?: (word: string) => void;
}

export const SignTooltip: React.FC<SignTooltipProps> = ({ word, vocabInfo, isLearned = false, onToggleLearned }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!vocabInfo) {
    return <span>{word}</span>;
  }

  return (
    <span className="tooltip-container">
      <span
        className={`keyword-highlight ${isLearned ? 'keyword-learned' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        {word}
      </span>

      {isOpen && (
        <>
          <div className="tooltip-overlay" onClick={() => setIsOpen(false)} />
          <div className="tooltip-card glass-panel animate-fade-in">
            <div className="tooltip-header flex-between">
              <h4>Ký hiệu cho: [{word}]</h4>
              <button className="icon-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${vocabInfo.videoId}?autoplay=1&mute=1&loop=1&playlist=${vocabInfo.videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
                title="Sign Language Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div className="tooltip-meaning flex-between">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PlayCircle color="#ef4444" size={20} style={{ marginRight: '8px' }} />
                <p>{vocabInfo.meaning}</p>
              </div>
              
              {onToggleLearned && (
                <button 
                  className={`btn-learned ${isLearned ? 'learned-active' : ''}`}
                  onClick={() => onToggleLearned(word)}
                >
                  {isLearned ? <CheckCircle size={18} /> : <Circle size={18} />}
                  <span>{isLearned ? 'Đã học' : 'Đánh dấu'}</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        .tooltip-container {
          position: relative;
          display: inline-block;
        }
        .keyword-highlight {
          color: var(--primary-hover);
          font-weight: 700;
          background-color: var(--secondary-light);
          padding: 2px 6px;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: underline;
          text-decoration-color: var(--secondary);
          text-decoration-thickness: 2px;
          text-underline-offset: 4px;
        }
        .keyword-highlight:hover {
          background-color: var(--secondary);
          color: #fff;
        }
        
        .keyword-learned {
          background-color: #dcfce7 !important;
          color: #166534 !important;
          text-decoration-color: #22c55e !important;
        }
        .keyword-learned:hover {
          background-color: #22c55e !important;
          color: #fff !important;
        }
        
        .tooltip-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 100;
        }
        
        .tooltip-card {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) !important;
          width: 360px;
          padding: 16px;
          z-index: 101;
          box-shadow: var(--shadow-lg);
          background: #ffffff;
        }
        
        /* Arrow */
        .tooltip-card::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -8px;
          border-width: 8px;
          border-style: solid;
          border-color: #ffffff transparent transparent transparent;
        }
        
        @media (max-width: 480px) {
          .tooltip-card {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) !important;
            bottom: auto;
            width: 90vw;
            max-width: 400px;
          }
          .tooltip-card::after {
            display: none;
          }
          .tooltip-overlay {
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(2px);
          }
        }
        
        .tooltip-header {
          margin-bottom: 12px;
        }
        .tooltip-header h4 {
          font-size: 1.1rem;
          color: #4338ca;
          margin: 0;
        }
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
        }
        .icon-btn:hover {
          background: var(--bg-color);
          color: var(--text-main);
        }
        
        .video-container {
          aspect-ratio: 16/9;
          background: #000;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 12px;
          border: 2px solid var(--primary);
        }
        
        .tooltip-meaning {
          align-items: center;
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
          padding: 8px 12px;
          background: var(--bg-color);
          border-radius: var(--radius-sm);
        }
        .tooltip-meaning p {
          margin: 0;
          color: var(--text-main);
        }
        
        .btn-learned {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-learned:hover {
          background: #e2e8f0;
          color: #334155;
        }
        .btn-learned.learned-active {
          background: #dcfce7;
          border-color: #22c55e;
          color: #166534;
        }
        .btn-learned.learned-active:hover {
          background: #bbf7d0;
        }
      `}</style>
    </span>
  );
};
