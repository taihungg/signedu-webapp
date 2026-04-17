import React from 'react';
import { supabase } from '../lib/supabase';

export const Login: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            prompt: ''
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page flex-center animate-fade-in">
      <div className="login-card glass-panel">
        <div className="login-header">
          <h1>Đăng nhập SignEdu</h1>
          <p>Chào mừng bạn trở lại! Vui lòng đăng nhập bằng tài khoản Google để tiếp tục.</p>
        </div>
        
        <div className="login-body">
          <button className="btn btn-outline google-btn" onClick={handleGoogleLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="24" height="24" />
            Tiếp tục với Google
          </button>
        </div>
        
        <div className="login-footer">
          <p>Bằng việc đăng nhập, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.</p>
        </div>
      </div>
      
      <style>{`
        .login-page {
          min-height: calc(100vh - 80px);
          background: radial-gradient(circle at top right, var(--primary-light) 0%, transparent 40%),
                      radial-gradient(circle at bottom left, var(--secondary-light) 0%, transparent 40%);
          padding: 20px;
        }
        .login-card {
          max-width: 440px;
          width: 100%;
          padding: 48px 32px;
          text-align: center;
        }
        .login-header {
          margin-bottom: 32px;
        }
        .login-header .logo-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .login-header h1 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }
        .google-btn {
          width: 100%;
          height: 54px;
          font-size: 1.1rem;
          border-radius: var(--radius-lg);
          background: white;
        }
        .login-footer {
          margin-top: 32px;
          font-size: 0.85rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};
