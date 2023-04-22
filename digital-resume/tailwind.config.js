export default {
  plugins: [],
  theme: {
    extend: {
      colors: {
        white: "#d1dada",
        "dark-white": "#467a7a",
        "b-white": "#9dcdcd",
      },
    },
  },
  purge: ["./index.html", "./src/**/*.{svelte,js,ts}"], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: false, // or 'media' or 'class'
};
