/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ["Futura", "ui-sans-serif", "system-ui"],
        nimbus: ["NimbusSanTBlaConRegular", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("daisyui")],
  corePlugins: {
    fontFamily: true,
  },
  daisyui: {
    styled: false,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    themes: ["light", "dark"],
  },
};
