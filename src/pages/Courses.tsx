import React from 'react';

export const Courses: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '60px 0', textAlign: 'center' }}>
      <div className="glass-panel" style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--success)', marginBottom: '16px' }}>Khóa học NNKH</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Tính năng này đang được phát triển. Coming soon!</p>
      </div>
    </div>
  );
};
