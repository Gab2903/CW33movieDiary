/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "*.html", "./*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#242D42",
        mediumblue: "#303d5a",
        hellgrey: "#B1B1B1",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        delete: "url('img/delete.png')",
        deleteHover: "url('img/delete_hover.png')",
      },
    },
  },
  plugins: [],
};
