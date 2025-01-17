<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    :class="{ dark: colorMode.value === 'dark' }"
    class="transition-colors duration-300 ease-in-out"
  >
    <div
      class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans flex flex-col"
    >
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
      >
        <picture>
          <source
            srcset="https://simpleanalyticsbadges.com/wanneervrij.nl?mode=dark"
            media="(prefers-color-scheme: dark)"
            width="160"
            height="51"
          />
          <img
            src="https://simpleanalyticsbadges.com/wanneervrij.nl?mode=light"
            loading="lazy"
            alt="Simple Analytics"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            width="160"
            height="51"
            fetchpriority="low"
            cache-control="public, max-age=86400"
          />
        </picture>
      </a>
    </div>
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

import { Analytics } from "@vercel/analytics/nuxt";
import { useHead } from "#imports";

const colorMode = useState("colorMode");

const route = useRoute();

const breadcrumbSchema = computed(() => {
  const pathSegments = route.path.split("/").filter((segment) => segment);

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://wanneervrij.nl",
    },
  ];

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      item: `https://wanneervrij.nl${currentPath}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElement,
  };
});

useHead({
  htmlAttrs: {
    lang: "nl",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
    { name: "theme-color", content: "#ffffff" },
    { property: "og:site_name", content: "Wanneer Vrij" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
  ],
  script: [
    {
      innerHTML: JSON.stringify(breadcrumbSchema.value),
      type: "application/ld+json",
    },
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
