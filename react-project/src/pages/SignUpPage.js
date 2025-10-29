import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

import Card from '../components/Card';
import AuthForm from '../components/AuthForm';
import { signUpUser } from '../services/authService';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      await signUpUser(email, password);
      toast.success('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.', { icon: '🎉' });
      navigate('/signin'); // Redirect to sign-in page after successful signup
    } catch (error) {
      console.error('Sign-up error:', error);
      let errorMessage = 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'هذا البريد الإلكتروني مستخدم بالفعل.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
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
          <UserPlus className=\"w-7 h-7 text-purple-500\" /> إنشاء حساب جديد
        </h2>
        <AuthForm onSubmit={handleSignUp} buttonText=\"إنشاء حساب\" loading={loading} />
        <p className=\"mt-6 text-gray-700 dark:text-gray-300\">
          لديك حساب بالفعل؟{' '}
          <Link to=\"/signin\" className=\"text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium transition-colors duration-200\">
            تسجيل الدخول
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;
