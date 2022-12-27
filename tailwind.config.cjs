/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundPosition:{
      'center' : 'center',
      'left-sm': 'left -28rem top',
      'left-md': 'left 0rem top'
    },
    extend: {
      fontFamily: {
        Popins: ['Poppins'],
        Roboto: ['Roboto'],
        Source: ['Source Sans Pro']
      }
    },
  },
  plugins: [],
}
