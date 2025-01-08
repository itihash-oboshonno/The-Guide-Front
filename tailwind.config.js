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
        dark: "#0d024b",
        accent: "#C4B0FF",
        prim2: "#4942E4",
        prim3: "#8696FE",
        black: "#1F2131",
      },
      screens: {
        'xxxs': '360px',
        'xxs': '420px',
        'xs': '480px',
        'mdb': '896px',
        'lgx': '1152px',
        'lgxx': '1480px'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

