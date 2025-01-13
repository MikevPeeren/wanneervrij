/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "#171717",
          dark: "#e8e8e8", // 18.4:1 - Excellent
        },
        background: {
          DEFAULT: "#f7f8f8",
          dark: "#070808",
        },
        primary: {
          DEFAULT: "#3f4a55",
          dark: "#aab5c0", // 11.3:1 - Excellent
        },
        secondary: {
          // Light mode variants
          light: "#91a6ba", // Decorative only
          DEFAULT: "#637c95", // AA compliant
          dark: "#445366", // AAA compliant
          // Dark mode variants
          "dark-light": "#5b7286", // For larger text (4.5:1)
          "dark-base": "#455a6e", // Original (4.8:1)
          "dark-high": "#2d3d4a", // For maximum contrast (7:1)
        },
        accent: {
          // Light mode variants
          light: "#3b6285", // Voor grote tekst (contrast ratio 3:1)
          DEFAULT: "#2d4b66", // Voor normale tekst (contrast ratio 4.5:1)
          dark: "#1c2f40", // Voor maximaal contrast
          // Dark mode variants
          "dark-light": "#7ab3e6", // Voor decoratieve elementen of grote tekst (contrast ratio 3:1)
          "dark-base": "#4a89c5", // Voor normale tekst (contrast ratio 4.5:1)
          "dark-high": "#2d5a8b", // Voor maximaal contrast
        },
      },
      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem",
      },
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        serif: [
          "Poppins",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        heading: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        body: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
