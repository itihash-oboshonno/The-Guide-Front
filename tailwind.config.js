/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#190482",
        dark: "#363848",
        accent: "#FE8D4D",
        black: "#1F2131",
      },
      screens: {
        'xxxs': '360px',
        'xxs': '420px',
        'xs': '480px',
        'mdb': '896px',
        'lgx': '1152px',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

