/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        transform: ['group-hover'],
        rotate: ['group-hover'],
        animation: {
          'gradient-x': 'gradient-x 10s ease infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': {
              'background-position': '0% 50%',
            },
            '50%': {
              'background-position': '100% 50%',
            },
          },
        },
        backgroundSize: {
          '300': '300% 300%',
        },
      },
    },
    plugins: [
      typography,
    ],
  };