/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1AA7F6",
        secondary: {
          100: "#1AA7F6",
          900: "#131618",
          fondo: "#0b0b0c",
          oscuro: "#5444c2",
          gris: "#222222",

          morado: "#5A40FA",
        },
        tercero: { limad: "#1ccc84sd", lima: "#1ccc84 " },
      },
      backgroundImage: {
        back1: "url('/img/back1.jpg')",
      },
    },
  },
  plugins: [],
};
