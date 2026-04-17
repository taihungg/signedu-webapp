import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar glass-panel">
      <div className="container flex-between">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-container flex-center">
            <img src="/logo.png" alt="SignEdu Logo" className="logo-image" />
          </div>
        </div>

        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <button className="nav-item" onClick={() => navigate('/dashboard')}>Khóa học</button>
              <button className="nav-item">Từ vựng</button>
              <button className="btn btn-outline flex-center" onClick={onLogout}>
                <LogOut size={18} /> Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button className="nav-item">Hiểu về người Điếc</button>
              <button className="nav-item">Dịch vụ</button>
              <button className="btn btn-primary flex-center" onClick={() => navigate('/login')}>
                <User size={18} /> Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 16px 0;
          border-radius: 0;
          border-bottom: 1px solid var(--border-color);
        }
        .logo-container {
          gap: 12px;
        }
        .logo-image {
          height: 60px;
          width: auto;
          object-fit: contain;
        }
        .logo-text {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          letter-spacing: -0.5px;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-item {
          background: transparent;
          border: none;
          font-size: 1rem;
          font-family: var(--font-primary);
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          padding: 4px 8px;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background-color: var(--secondary);
          transition: var(--transition);
          border-radius: 2px;
        }
        .nav-item:hover {
          color: var(--text-main);
        }
        .nav-item:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};
