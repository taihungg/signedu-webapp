import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { supabase } from './lib/supabase';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Reader } from './pages/Reader';
import { Dictionary } from './pages/Dictionary';
import { Courses } from './pages/Courses';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar 
          isAuthenticated={!!session} 
          onLogout={handleLogout} 
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={session ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/login" 
              element={session ? <Navigate to="/dashboard" replace /> : <Login />} 
            />
            <Route 
              path="/dashboard" 
              element={session ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/story/:id" 
              element={session ? <Reader /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/dictionary" 
              element={session ? <Dictionary /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/courses" 
              element={session ? <Courses /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
