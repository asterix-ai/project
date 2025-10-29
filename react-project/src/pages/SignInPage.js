import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

import Card from '../components/Card';
import AuthForm from '../components/AuthForm';
import { signInUser } from '../services/authService';

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success('تم تسجيل الدخول بنجاح! مرحبًا بك.', { icon: '👋' });
      navigate('/products'); // Redirect to products management page
    } catch (error) {
      console.error('Sign-in error:', error);
      let errorMessage = 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'لا يوجد مستخدم بهذا البريد الإلكتروني.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'كلمة المرور خاطئة.';
      } else if (error.code === 'auth/invalid-credential'){
        errorMessage = 'بيانات الاعتماد غير صالحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.';
      }
      toast.error(errorMessage, { icon: '🚨' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=\"flex items-center justify-center min-h-[calc(100vh-160px)] px-4\"
    >
      <Card className=\"w-full max-w-md p-8 sm:p-10 lg:p-12 text-center\">
        <h2 className=\"text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-3\">
          <LogIn className=\"w-7 h-7 text-indigo-500\" /> تسجيل الدخول
        </h2>
        <AuthForm onSubmit={handleSignIn} buttonText=\"تسجيل الدخول\" loading={loading} />
        <p className=\"mt-6 text-gray-700 dark:text-gray-300\">
          ليس لديك حساب؟{' '}
          <Link to=\"/signup\" className=\"text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium transition-colors duration-200\">
            إنشاء حساب جديد
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default SignInPage;
