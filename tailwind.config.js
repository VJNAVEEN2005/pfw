/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "Primary-black" : "#121212",
          "Secondary-black" : "#212121",
          "Primary-Green" : "#1db954"
        }
      },
    },
    plugins: [],
    darkMode: 'class',
  }
  