import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Package } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className=\"flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center px-4 py-12 sm:py-16 lg:py-24\"
      variants={containerVariants}
      initial=\"hidden\"
      animate=\"visible\"
    >
      <motion.h1 variants={itemVariants} className=\"text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight\">
        أهلاً بك في <span className=\"bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600\">متجر الأسماك</span>
      </motion.h1>
      <motion.p variants={itemVariants} className=\"text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10\">
        استكشف عالمًا من المأكولات البحرية الطازجة. إدارة منتجاتك لم تكن أسهل من قبل!
      </motion.p>

      <motion.div variants={itemVariants} className=\"flex flex-col sm:flex-row gap-4 mb-12\">
        {!user ? (
          <>
            <Link to=\"/signup\">
              <Button icon={Sparkles} className=\"from-cyan-500 to-blue-500\">إنشاء حساب جديد</Button>
            </Link>
            <Link to=\"/signin\">
              <Button icon={Zap} className=\"from-rose-500 to-pink-500\">تسجيل الدخول</Button>
            </Link>
          </>
        ) : (
          <Link to=\"/products\">
            <Button icon={Package} className=\"from-indigo-500 to-purple-600\">إدارة منتجاتي</Button>
          </Link>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className=\"grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12\">
        <motion.div variants={itemVariants} className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50\">
          <Heart className=\"w-10 h-10 text-rose-500 mx-auto mb-4\" />
          <h3 className=\"text-xl font-semibold mb-2\">منتجات طازجة</h3>
          <p className=\"text-gray-600 dark:text-gray-400\">نقدم لك أجود أنواع الأسماك والمأكولات البحرية يوميًا.</p>
        </motion.div>
        <motion.div variants={itemVariants} className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50\">
          <Zap className=\"w-10 h-10 text-cyan-500 mx-auto mb-4\" />
          <h3 className=\"text-xl font-semibold mb-2\">إدارة سهلة</h3>
          <p className=\"text-gray-600 dark:text-gray-400\">واجهة سلسة لإضافة وتعديل وحذف المنتجات بسهولة.</p>
        </motion.div>
        <motion.div variants={itemVariants} className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50\">
          <Sparkles className=\"w-10 h-10 text-purple-500 mx-auto mb-4\" />
          <h3 className=\"text-xl font-semibold mb-2\">تصميم عصري</h3>
          <p className=\"text-gray-600 dark:text-gray-400\">استمتع بتجربة مستخدم أنيقة وجذابة مع الوضع الداكن.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
