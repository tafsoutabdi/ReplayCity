/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a7a5e',
        'primary-dark': '#155f49',
        'primary-light': '#e8f5f1',
        accent: '#f59e0b',
        danger: '#ef4444',
        'score-high': '#ef4444',
        'score-mid': '#f59e0b',
        'score-low': '#10b981',
      },
    },
  },
  plugins: [],
}

