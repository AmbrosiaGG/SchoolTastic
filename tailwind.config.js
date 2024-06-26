/** @type {import('tailwindcss').Config} */
export default {
  /*
   * Aha i fixed the sidebar problem! It was that i forgot "./templates/*" in the contents thing below 
  */
  content: ["./views/**/*", "./views/*", "./templates/*", "./SmartWiz/*", "./assets/**/*", "node_modules/preline/dist/*.js"], // Withou't this shit will break
  darkMode: 'class', // ! Dont touch this
  theme: {
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"], // TODO: ADD A BETTER FONT
      calsans: ["Cal Sans"], // UwU Found it. Finnaly no shiz like Montserrat
      srcode: ["Source Code Pro", "monospace"], // From the NEXTJS INFDEV
      annon: ["Anonymous Pro", "monospace"],
      paytone: ["Paytone One", "sans-serif"],
      IBM: ["IBM Plex Mono", "monospace"]
    },
    extend: {},
    keyframes: { // Copied from Dirty Cajun Rice
      "scroll": {
        to: { transform: 'translate(calc(-50% - 0.5rem))' }
      }
    },
    animation: {
      scroll: "scroll 40s linear infinite"
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f5c2e7",
          "secondary": "#eba0ac",
          "accent": "#f5c2e7",
          "neutral": "#181825",
          "base-100": "#1e1e2e",
          "info": "#00b1ff",
          "success": "#a6e3a1",
          "warning": "#f9e2af",
          "error": "#f38ba8",
        },
      },
    ],
  },
  plugins: [
    require('preline/plugin'), // * Only preline can save this project
    require("@catppuccin/tailwindcss")({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `false`, which means no prefix
      prefix: "ctp",
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "mocha",
    }),
    require('daisyui'),
  ],
}
