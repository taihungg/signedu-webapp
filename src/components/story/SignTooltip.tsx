import React, { useState } from 'react';
import type { Vocabulary } from '../../lib/mockData';
import { X, PlayCircle } from 'lucide-react';

interface SignTooltipProps {
  word: string;
  vocabInfo: Vocabulary | null;
}

export const SignTooltip: React.FC<SignTooltipProps> = ({ word, vocabInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!vocabInfo) {
    return <span>{word}</span>;
  }

  return (
    <span className="tooltip-container">
      <span
        className="keyword-highlight"
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

            <div className="tooltip-meaning flex-center">
              <PlayCircle color="#ef4444" size={20} style={{ marginRight: '8px' }} />
              <p>{vocabInfo.meaning}</p>
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
          width: 340px;
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
          justify-content: flex-start;
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
          padding: 8px;
          background: var(--bg-color);
          border-radius: var(--radius-sm);
        }
        .tooltip-meaning p {
          margin: 0;
          color: var(--text-main);
        }
      `}</style>
    </span>
  );
};
