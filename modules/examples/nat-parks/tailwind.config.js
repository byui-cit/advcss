/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      spacing: {
        "resp-8": "8vw",
        "resp-24": "24vw"
      }
    }
  },
  plugins: []
};
