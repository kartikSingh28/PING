/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    colors: {
      pingBlue: "#1E90FF",
      pingCyan: "#00E0FF",
      pingDark: "#0A0A0A",
    },
  },
},
  plugins: [],
}
