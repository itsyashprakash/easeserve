/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'primary': '#00D162',
        'primary': '#3786E2',
        'secondary': '#BFF4B0',
        'tertiary': '#00B252',
        'muted-tertiary': '#00B25240',
        'contrast': '#000000',
        'secondary-shadow': '#A9DC9C',
        'muted': '#999999',
        'muted-darker': '#7F7F7F',
        'light-tertiary': '#32E484',
        'muted-main': '#f2f2f2'
      },
      spacing: {
        '86': '21rem',
        '0.5': '0.16rem'
      }
    },
  },
  plugins: [],
}