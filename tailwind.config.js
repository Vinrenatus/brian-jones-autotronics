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
          DEFAULT: '#0d2a47',
          light: '#1a3d5f',
        },
        secondary: {
          DEFAULT: '#c41e3a',
          dark: '#a01830',
        },
        accent: {
          DEFAULT: '#f5a623',
          dark: '#d48910',
        },
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Roboto Slab', 'Georgia', 'serif'],
      },
      boxShadow: {
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}
