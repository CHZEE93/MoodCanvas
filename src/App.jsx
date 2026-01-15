import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DiaryGrid from './components/DiaryGrid';
import Gallery from './components/Gallery';

import { supabase } from './lib/supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if config is missing
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    }).catch(err => {
      console.error("Supabase session error:", err);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-sea-gradient flex items-center justify-center text-white flex-col gap-4">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="opacity-60 text-sm tracking-widest uppercase">내면의 바다를 불러오는 중...</p>
      </div>
    );
  }

  // Graceful error if config is missing
  if (!import.meta.env.VITE_SUPABASE_URL) {
    return (
      <div className="min-h-screen bg-sea-gradient flex items-center justify-center text-white p-8 text-center">
        <div className="space-y-4 max-w-md">
          <h2 className="text-xl font-bold text-red-300">Configuration Missing</h2>
          <p className="text-white/60">
            Supabase environment variables are missing. Please create <code className="bg-black/20 p-1 rounded">.env.local</code> and add your project credentials.
          </p>
          <pre className="text-xs bg-black/40 p-4 rounded text-left overflow-x-auto">
            {`VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={!session ? <LoginPage /> : <Navigate to="/main" replace />} />
      <Route path="/signup" element={!session ? <SignUpPage /> : <Navigate to="/main" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainLayout />}>
          <Route index element={<DiaryGrid />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
