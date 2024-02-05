/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668a',
        'weather-secondary': '#004E71',
      },
    },
    fontFamily: {
      roboto: ['Roboto, sans-serif'],
      pacifico: ['Pacifico, sans-serif'],
    },
  },
  plugins: [],
}
