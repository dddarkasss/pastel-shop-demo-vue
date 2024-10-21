/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFD1DC',
        'pastel-white': '#FFFAFA',
      },
    },
  },
  plugins: [],
}