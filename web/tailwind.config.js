/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Roboto", "sans-serif"]
      },
      backgroundImage: {
        app: 'url(/app-bg.png)'
      },
      colors: {
        gray: {
          '900': "#1E1E1E",
          "800": "#202024",
          "600": "#323238",
          "300": "#8D8D99",
          '100': "#E1E1E6"
        },
        ignite: {
          "500": "#129E57"
        },
        yellow: {
          "500": "#F7DD43",
          "700": "#BFA613",
        }
      }
    },
  },
  plugins: [],
}
