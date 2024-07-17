/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#51CB20",
        secondary: "#545F66",
        accent: "#3fad13",
        "sec-accent": "#40494f",
      },
      keyframes: {
        load: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
