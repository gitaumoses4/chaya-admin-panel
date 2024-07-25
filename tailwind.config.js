/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e9f0ff',
          100: '#c6d1ee',
          200: '#a3b2dd',
          300: '#7f93cd',
          400: '#5b75bd',
          500: '#425ba4',
          600: '#324780',
          700: '#23335d',
          800: '#131e3b',
          900: '#030a1a',
          DEFAULT: '#425ba4',
        },
      },
      aspectRatio: {
        game: '56.25%',
      },
    },
  },
  plugins: [],
};
