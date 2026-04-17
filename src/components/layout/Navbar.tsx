import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/story');
  const isDictionary = location.pathname.includes('/dictionary');
  const isCourses = location.pathname.includes('/courses');

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-grid">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <div className="logo-container flex-center">
            <img src="/logo.png" alt="SignEdu Logo" className="logo-image" />
          </div>
        </div>

        <div className="navbar-center">
          {isAuthenticated ? (
            <>
              <button 
                className={`nav-pill ${isCourses ? 'active-tertiary' : ''}`} 
                onClick={() => navigate('/courses')}
              >
                Khóa học NNKH
              </button>
              <button 
                className={`nav-pill ${isDashboard ? 'active-primary' : ''}`} 
                onClick={() => navigate('/dashboard')}
              >
                Học từ vựng
              </button>
              <button 
                className={`nav-pill ${isDictionary ? 'active-secondary' : ''}`} 
                onClick={() => navigate('/dictionary')}
              >
                Kho từ vựng
              </button>
            </>
          ) : (
            <>
              <button className="nav-item">Hiểu về người Điếc</button>
              <button className="nav-item">Dịch vụ</button>
            </>
          )}
        </div>
        
        <div className="navbar-right">
          {isAuthenticated ? (
            <button className="btn btn-outline flex-center" onClick={onLogout}>
              <LogOut size={18} /> Đăng xuất
            </button>
          ) : (
             <button className="btn btn-primary flex-center" onClick={() => navigate('/login')}>
              <User size={18} /> Đăng nhập
            </button>
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
        .navbar-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }
        .navbar-brand {
          cursor: pointer;
          justify-self: start;
        }
        .navbar-center {
          justify-self: center;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .navbar-right {
          justify-self: end;
          display: flex;
          align-items: center;
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
        .nav-pill {
          background: transparent;
          border: none;
          font-size: 1rem;
          font-family: var(--font-primary);
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          padding: 8px 24px;
          border-radius: var(--radius-full);
        }
        .nav-pill:hover {
          background: var(--bg-color);
          color: var(--text-main);
        }
        .nav-pill.active-primary {
          background-color: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(131, 218, 242, 0.4);
        }
        .nav-pill.active-secondary {
          background-color: var(--secondary);
          color: #854d0e;
          box-shadow: 0 4px 12px rgba(241, 213, 119, 0.4);
        }
        .nav-pill.active-tertiary {
          background-color: var(--success);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </nav>
  );
};
