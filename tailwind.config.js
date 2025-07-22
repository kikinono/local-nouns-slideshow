/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{html,js}",
    "./docs/prefecture/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'nouns-bg': '#d5d7e1',
        'nouns-yellow': '#fed702',
        'nouns-red': '#e74c3c',
        'nouns-blue': '#3b82f6',
        'nouns-green': '#10b981',
        'nouns-purple': '#8b5cf6',
        'nouns-orange': '#f97316'
      },
      fontFamily: {
        'sans': ['Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-light': 'bounceLight 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceLight: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' }
        }
      }
    },
  },
  plugins: [],
}