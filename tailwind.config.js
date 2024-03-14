/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1AA7F6",
        secondary:{
          100:"#1AA7F6" ,
          900:"#131618",
          fondo:"#0b0b0c"
        },
      },
    },
  },
  plugins: [],
};
