/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 400: "#041C32", 600: "#072745" },
        secondary: { 400: "#ECB365", 600: "#d89d4e" },
        tertiary: "#064663",
      },
    },
  },
  plugins: [],
};
