/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#40d9ed', 
        'primary-hover': '#26b8a5'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};