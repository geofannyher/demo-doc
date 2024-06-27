/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px)

      md: "768px",
      // => @media (min-width: 768px)

      lg: "1024px",
      // => @media (min-width: 1024px)

      xl: "1280px",
      // => @media (min-width: 1280px)

      "2xl": "1536px",
      // => @media (min-width: 1536px)
    },
    extend: {
      colors: {
        mainColor: "#d0021b",
        secondColor: "#f5f7fc",
        thirdColor: "#ED0266",
        hoverBtn: "#101730",
        chatAi: "#e2e8e9",
      },
    },
  },
  plugins: [],
};
