import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fish, Home, Package, LogIn, UserPlus, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { signOutUser } from '../services/authService';
import toast from 'react-hot-toast';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success('تم تسجيل الخروج بنجاح!', { icon: '👋' });
    } catch (error) {
      toast.error(`خطأ في تسجيل الخروج: ${error.message}`, { icon: '🚨' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className=\"bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md sticky top-0 z-50 py-4 border-b border-gray-200/50 dark:border-gray-800/50\"
    >
      <div className=\"container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between\">
        <Link to=\"/\" className=\"flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400\">
          <Fish className=\"w-7 h-7 text-rose-500\" />
          <span className=\"hidden sm:inline\">متجر الأسماك</span>
        </Link>

        <div className=\"flex items-center space-x-4\">
          <NavLink to=\"/\" icon={Home}>الرئيسية</NavLink>
          {user && <NavLink to=\"/products\" icon={Package}>إدارة المنتجات</NavLink>}

          {!user ? (
            <>
              <NavLink to=\"/signin\" icon={LogIn}>تسجيل الدخول</NavLink>
              <NavLink to=\"/signup\" icon={UserPlus}>إنشاء حساب</NavLink>
            </>
          ) : (
            <motion.button
              onClick={handleSignOut}
              className=\"flex items-center gap-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 py-2 px-3 rounded-lg\"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className=\"w-5 h-5\" />
              <span className=\"hidden md:inline\">تسجيل الخروج</span>
            </motion.button>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className=\"p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200\"
            aria-label=\"Toggle dark mode\"
          >
            {darkMode ? <Sun className=\"w-6 h-6\" /> : <Moon className=\"w-6 h-6\" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, icon: Icon, children }) => (
  <Link
    to={to}
    className=\"flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-2 px-3 rounded-lg\"
  >
    {Icon && <Icon className=\"w-5 h-5\" />}
    <span className=\"hidden md:inline\">{children}</span>
  </Link>
);

export default Navbar;
