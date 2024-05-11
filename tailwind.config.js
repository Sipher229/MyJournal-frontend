/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "coverBg": "url('./src/assets/image_assets/NoteBook.jpg')",


      },
      colors:{
        "myIndigo": "#CD36BE",
        "fadedWhite": "#F0F0F0"

      }
    },
  },
  plugins: [],
}

