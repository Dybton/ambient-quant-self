/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'lg': '0 1.82px 5.4px 0px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
