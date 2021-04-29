module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#ffffff",
        secondary: "#F3C959",
        primary_action: "#C54520",
        secondary_action: "#4169F2",
        font_primary_color: "#333",
        font_disable_color: "#888",
        error: "#FF2B3A",
        success: '#005347'
      },
      minHeight: {
        '40vh': '40vh'
      },
      minWidth: {
        '25vw': '25vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '75vw': '75vw',
        '95vw': '95vw'
      }
    },
    fontFamily: {
      'poppins': ['"Open Sans"', 'sans-serif']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
