/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        heightWithoutNavbar: "calc(100vh - 80px)",
      },
      backgroundImage: {
        unsplashBgImage: "url('/img/bgImg.jpg')",
      },
    },
    animation: {
      spinner_normal: "spinner 1s infinite linear",
    },
    keyframes: {
      spinner: {
        "100%": { transform: "rotate(1turn)" },
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hover\\:no-underline:hover': {
          textDecoration: 'none',
        },
      })
    },
  ],
};
