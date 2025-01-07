// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxtjs/color-mode", "@nuxtjs/sitemap"],
  plugins: ["~/plugins/darkMode.ts"],
  eslint: {}, // Options here
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
  runtimeConfig: {
    FORMSPREE_ENDPOINT: process.env.FORMSPREE_ENDPOINT,
  },
  sitemap: {
    hostname: "https://wanneervrij.nl",
    gzip: true,
    exclude: ["/admin/**"],
    routes: async () => {
      // Hier kun je dynamische routes toevoegen als je die hebt
      return [];
    },
  },
});
