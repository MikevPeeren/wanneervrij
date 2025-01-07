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
          light: "#54799c", // Large text only
          DEFAULT: "#456380", // AA compliant
          dark: "#2d4154", // AAA compliant
          // Dark mode variants
          "dark-light": "#89afd2", // For decorative (3:1)
          "dark-base": "#6388ab", // Original (6.4:1)
          "dark-high": "#4d6a85", // For maximum contrast (7:1)
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
        heading: "Noto Sans Kharoshthi",
        body: "Noto Sans Kharoshthi",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};
