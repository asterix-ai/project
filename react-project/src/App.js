import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { useAuth } from './hooks/useAuth';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProductManagementPage from './pages/ProductManagementPage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingSpinner from './components/LoadingSpinner';

import './styles/globals.css';

// A private route component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className=\"flex items-center justify-center min-h-screen\">
        <LoadingSpinner loading={loading} text=\"جاري التحقق من المستخدم...\" />
      </div>
    );
  }

  return user ? children : <Navigate to=\"/signin\" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') === 'dark') return true;
      if (localStorage.getItem('theme') === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <FirebaseProvider>
      <Router>
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
          <Toaster position=\"top-center\" reverseOrder={false} />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className=\"container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl\">
            <Routes>
              <Route path=\"/\" element={<HomePage />} />
              <Route path=\"/signin\" element={<SignInPage />} />
              <Route path=\"/signup\" element={<SignUpPage />} />
              <Route
                path=\"/products\"
                element={
                  <PrivateRoute>
                    <ProductManagementPage />
                  </PrivateRoute>
                }
              />
              <Route path=\"*\" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
