/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      zIndex: {
        'max': 1000
      }
    },
  },
  plugins: [],
}
