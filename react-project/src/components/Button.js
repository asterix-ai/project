import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, type = 'button', disabled = false, icon: IconComponent }) => {
  const baseClasses = \"flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-medium\";
  const disabledClasses = \"opacity-60 cursor-not-allowed\";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className} ${disabled ? disabledClasses : ''}`}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -3 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      disabled={disabled}
    >
      {IconComponent && <IconComponent className=\"w-5 h-5\" />}
      {children}
    </motion.button>
  );
};

export default Button;
