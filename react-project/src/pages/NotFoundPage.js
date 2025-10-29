import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className=\"flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center px-4 py-12\"
    >
      <Frown className=\"w-24 h-24 text-rose-500 mb-6\" />
      <h1 className=\"text-6xl font-extrabold text-gray-900 dark:text-white mb-4\">
        404
      </h1>
      <p className=\"text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-md\">
        عذرًا، الصفحة التي تبحث عنها غير موجودة.
      </p>
      <Link to=\"/\">
        <Button className=\"from-indigo-500 to-purple-600\">العودة إلى الرئيسية</Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
