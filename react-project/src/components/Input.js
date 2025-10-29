import React from 'react';

const Input = ({ label, id, type, value, onChange, placeholder, error, className, ...props }) => {
  const inputClasses = \"w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none\";
  const errorClasses = \"border-rose-500 focus:border-rose-500 focus:ring-rose-500/20\";

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClasses} ${error ? errorClasses : ''}`}
        {...props}
      />
      {error && <p className=\"text-rose-500 text-sm mt-1\">{error}</p>}
    </div>
  );
};

export default Input;
