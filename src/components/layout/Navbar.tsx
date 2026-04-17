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
          {/* We will use the provided logo image */}
          <div className="logo-container flex-center">
            <span className="logo-icon">👋</span>
            <span className="logo-text">SignEdu</span>
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
        .logo-icon {
          font-size: 28px;
          color: var(--primary);
        }
        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-main);
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
        }
        .nav-item:hover {
          color: var(--primary-hover);
        }
      `}</style>
    </nav>
  );
};
