/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [{
      mytheme : {
        "primary" : "#5abd4f", // green
        "secondary" : "#ff5722",//orange
        "neutral" : "#000000",  //black(text color)
        "base-100" : "#ffffff"  //white bg color
      }
    }],
    fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Replace 'Poppins' with your chosen font
      },
      
  },

  fontSize: {
    'hero': '2.5rem', // Custom font size for large headings
    'subheading': '1.125rem', // Adjust as needed
  },

 
}

