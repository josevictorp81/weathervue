/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#1C9CF6',
        'blue-secondary': '#19C3FB',
        'gray-primary': '#E3F4FE',
        'yellow-primary': '#FFFAE0',
      },
    },
    fontFamily: {
      roboto: ['Roboto, sans-serif'],
      pacifico: ['Pacifico, sans-serif'],
    },
  },
  plugins: [],
}
