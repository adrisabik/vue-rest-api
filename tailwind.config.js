/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'red': '#ff0000',
      'blue': '#5BC0F8',
    },
    extend: {},
  },
  plugins: [],
}
