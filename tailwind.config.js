/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'darkGray': 'rgba(64,64,89)',
        'mediumGray': 'rgba(245,245,245)',
        'lightGray': 'rgba(250,249,248)',
      },
    },
  },
  plugins: [],
}

