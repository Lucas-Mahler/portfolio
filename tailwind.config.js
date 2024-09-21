/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  lightMode: "Selector",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      blur: {
        xs: "3px",
      },
      fontFamily: {
        robotoMono: ['"Roboto Mono"', "monospace"],
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
    },
  },
  plugins: [],
};
