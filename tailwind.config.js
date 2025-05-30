/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e6ea',
          100: '#ebcdd5',
          200: '#d79bb0',
          300: '#c3698b',
          400: '#af3766',
          500: '#7D2E46', // main primary color
          600: '#64253b',
          700: '#4b1c30',
          800: '#321325',
          900: '#19091a',
        },
        secondary: {
          50: '#f0f2ed',
          100: '#e1e5db',
          200: '#c3ccb8',
          300: '#a5b394',
          400: '#8F9E7D', // main secondary color
          500: '#778565',
          600: '#5f6c4e',
          700: '#475337',
          800: '#2f3920',
          900: '#171f09',
        },
        accent: {
          50: '#faf5eb',
          100: '#f5ebd7',
          200: '#ebd7af',
          300: '#e0c387',
          400: '#D4B483', // main accent color
          500: '#c9a05f',
          600: '#b28c4b',
          700: '#8b6937',
          800: '#644723',
          900: '#3d240e',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Lexend', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};