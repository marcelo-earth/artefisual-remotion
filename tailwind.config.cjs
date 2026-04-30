const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        monokai: {
          orange: "#FC9867",
          pink: "#FF80AB",
          skyblue: "#80D8FF",
          purple: "#B388FF",
          green: "#69F0AE",
          yellow: "#FFE57F",
        },
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: ({ opacityValue }) =>
          opacityValue !== undefined
            ? `color-mix(in srgb, var(--color-background-offset) ${Math.round(opacityValue * 100)}%, transparent)`
            : "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
        offset: "var(--color-border)",
      },
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [require("tailwindcss-fluid-type")],
};
