/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#211C84',
          light: 'rgba(33, 28, 132, 0.1)',
        },
        secondary: {
          DEFAULT: '#7A73D1',
          light: 'rgba(122, 115, 209, 0.1)',
        },
      },
    },
  },
  plugins: [],
}
