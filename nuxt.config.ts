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
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
          media: "print",
          onload: "this.media='all'",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "dark", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  runtimeConfig: {
    FORMSPREE_ENDPOINT: process.env.FORMSPREE_ENDPOINT,
  },
  site: {
    url: "https://wanneervrij.nl",
    name: "Wanneer Vrij",
    gzip: true,
    exclude: ["/admin/**"],
  },
});
