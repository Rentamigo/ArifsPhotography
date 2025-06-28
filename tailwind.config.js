/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom color palette for both themes - CHANGED TO BLUE
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00BFFF', // Main blue color (Deep Sky Blue)
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Light theme colors
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          text: '#1e293b',
          'text-secondary': '#64748b',
          border: '#e2e8f0',
        },
        // Dark theme colors
        dark: {
          bg: '#000000',
          surface: '#0f172a',
          card: '#1e293b',
          text: '#f8fafc',
          'text-secondary': '#94a3b8',
          border: '#334155',
        }
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      },
      animation: {
        'theme-transition': 'theme-transition 0.3s ease-in-out',
      },
      keyframes: {
        'theme-transition': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};