import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className }) => {
  const baseClasses = \"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]\";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
