/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '180px', // Define a custom xs breakpoint for smaller screens
      },
    },
  },

  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide')
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
  },

 
}

