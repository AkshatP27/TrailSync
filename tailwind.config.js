module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        'sky-blue': '#a0d8ef',
        'forest': '#2e8b57',
        'earth': '#deb887',
        'sandy': '#f4a460',
        'off-white': '#f9f7f4',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'flutter': 'flutter 8s ease-in-out infinite',
        'sway': 'sway 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        flutter: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(5px, -5px) rotate(2deg)' },
          '50%': { transform: 'translate(0, -10px) rotate(-2deg)' },
          '75%': { transform: 'translate(-5px, -5px) rotate(2deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
    },
  },
  plugins: [],
}

