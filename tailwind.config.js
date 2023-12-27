/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // #step1 - 'content' - specify all code where Tailwind might have been used. This is a required step, not an optimization.
  theme: {
    extend: {},
  },
  plugins: [],
};
