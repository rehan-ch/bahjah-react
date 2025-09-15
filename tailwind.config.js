/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#F4A261",
          orange: "#F4A261",
          secondary: "#5D8A82",
          accent: "#e5e7e6",
          lightGray: "#b7b5b3",
          darkGray: "#373f51",
          custom: "#00343A",
          button: "#006936",
          borderGreen: "#008346",
          leafGreen: "#84AC40",
        },
        fontFamily: {
          saudi: ["Saudi", "sans-serif"],
        },
      },
    },
    plugins: [
      function({ addUtilities }) {
        const newUtilities = {
          '.scrollbar-hide': {
            /* IE and Edge */
            '-ms-overflow-style': 'none',
            /* Firefox */
            'scrollbar-width': 'none',
            /* Safari and Chrome */
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }
        }
        addUtilities(newUtilities)
      }
    ],
  }
  