/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    \"./src/**/*.{js,jsx,ts,tsx}\",
    \"./public/index.html\"
  ],
  theme: {
    extend: {
      colors: {
        indigo: '#6366f1',
        purple: '#8b5cf6',
        cyan: '#06b6d4',
        rose: '#f43f5e',
        primary: '#6366f1',
        secondary: '#8b5cf6'
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}