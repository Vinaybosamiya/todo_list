module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* override black to read your CSS variable */
        black: 'var(--black)',
      },
    },
  },
  plugins: [],
}
