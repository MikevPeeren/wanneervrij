<!-- eslint-disable vue/html-self-closing -->
<template>
  <div :class="{ dark: colorMode === 'dark' }">
    <div class="min-h-screen bg-background text-text font-sans flex flex-col">
      <Header />

      <main class="max-w-3xl mx-auto px-4 py-8 flex-grow">
        <Analytics />
        <NuxtPage />
      </main>

      <Footer />

      <a
        href="https://dashboard.simpleanalytics.com/?utm_source=wanneervrij.nl&utm_content=badge&affiliate=togad"
        referrerpolicy="origin"
        target="_blank"
        class="fixed bottom-4 right-4 z-50"
        ><picture
          ><source
            srcset="https://simpleanalyticsbadges.com/wanneervrij.nl?mode=dark"
            media="(prefers-color-scheme: dark)"
          />
          <img
            src="https://simpleanalyticsbadges.com/wanneervrij.nl?mode=light"
            loading="lazy"
            alt="Simple Analytics"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
          /> </picture
      ></a>
    </div>
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

import { Analytics } from "@vercel/analytics/nuxt";
import { useHead } from "#imports";

const colorMode = useState("colorMode");

useHead({
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
  ],
  meta: [
    { name: "msapplication-TileColor", content: "#3f4a55" },
    { name: "theme-color", content: "#3f4a55" },
  ],
});
</script>

<style>
body {
  @apply bg-background text-text transition-colors duration-300 ease-in-out;
}

.dark body {
  @apply bg-background-dark text-text-dark;
}
</style>
