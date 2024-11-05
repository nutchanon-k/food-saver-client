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
        "primary" : "#5abd4f",
        "secondary" : "42b72a",
        "accent" : "#37cdbe",
        "neutral" : "#F6F5FA",
        "base-100" : "#ffffff"
      }
    }],
  },

 
}

