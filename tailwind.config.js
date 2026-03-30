/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2d5491',
          dark: '#0f2744',
        },
        accent: {
          DEFAULT: '#00c9a7',
          hover: '#00a889',
        },
      },
      gridTemplateColumns: {
        'detail': '1fr 380px',
      },
      animation: {
        'slide-down': 'slideDown 0.22s ease-out',
        'fade-in': 'fadeIn 0.35s ease-out',
        'fade-up': 'fadeUp 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
