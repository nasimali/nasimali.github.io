/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#3b82f6", dark: "#60a5fa" }
      },
      container: {
        center: true,
        padding: "1rem"
      }
    }
  },
  plugins: []
};