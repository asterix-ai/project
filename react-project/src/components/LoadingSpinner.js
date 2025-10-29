import React from 'react';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ loading, size = 30, color = \"#6366f1\", text = \"جاري التحميل...\" }) => {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=\"flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-md\"
    >
      <ClipLoader color={color} size={size} />
      <p className=\"mt-3 text-sm font-medium text-gray-700 dark:text-gray-300\">{text}</p>
    </motion.div>
  );
};

export default LoadingSpinner;
