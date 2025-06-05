/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A5D7A',
          light: '#6B7FA1',
          dark: '#2D3A4F'
        },
        secondary: {
          DEFAULT: '#E91E63',
          light: '#FF5C8A',
          dark: '#B71C4C'
        },
        accent: '#64B5F6',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'glass': '0 8px 32px rgba(0,0,0,0.12)',
        'glow': '0 0 20px rgba(100, 181, 246, 0.3)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'rain-drop': 'rain-drop 2s linear infinite',
        'ripple': 'ripple 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        'rain-drop': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' }
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(100, 181, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(100, 181, 246, 0.6)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}