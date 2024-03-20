/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      "rubik": ['Rubik', "sans-serif"],
    },
    fontSize: {
      "size-400": ["14px", "1.4em"],
      "size-500": ["16px", "1.4em"],
      "size-600": ["18px", "1.4em"],
      "size-700": ["22px", "1.5em"],
      "size-800": ["25px", "1.6em"],
    },
    extend: {
      colors:{
        blue: "hsl(238, 40%, 52%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "pale-red": "hsl(357, 100%, 86%)",
        "gray-blue-100": "hsl(211, 10%, 45%)",
        "gray-blue-200": "hsl(239, 57%, 85%)",
        "gray-100": "hsl(223, 19%, 93%)",
        "gray-200": "hsl(228, 33%, 97%)",
        white: "hsl(0, 0%, 100%)",
        black: "#000000"
      },
    },
  },
  plugins: [],
}

