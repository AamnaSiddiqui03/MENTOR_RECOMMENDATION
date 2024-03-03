/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: "#7289da",   // Blue
        white: "#ffffff",     // White
        lightGray: "#99aab5", // Light Gray
        darkGray: "#2c2f33",  // Dark Gray
        myblack: "#23272a",     // Black
        medblue: "#031431",   // Medium Blue
      },
    },
  },
  plugins: [],
}
