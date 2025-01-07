<template>
  <div class="min-h-screen bg-background text-text font-sans flex flex-col">
    <header class="bg-primary text-background shadow-md">
      <nav
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <NuxtLink to="/" class="flex items-center space-x-2">
          <Logo />
        </NuxtLink>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink
              to="/"
              class="hover:text-secondary transition-colors duration-200"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/feestdagen"
              class="hover:text-secondary transition-colors duration-200"
              >Feestdagen</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/schoolvakanties"
              class="hover:text-secondary transition-colors duration-200"
              >Schoolvakanties</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/over-ons"
              class="hover:text-secondary transition-colors duration-200"
              >Over ons</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="hover:text-secondary transition-colors duration-200"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8 flex-grow">
      <NuxtPage />
    </main>

    <footer class="bg-primary text-background text-center py-4 mt-8">
      <p>
        &copy; {{ new Date().getFullYear() }} Wanneer Vrij. Alle rechten
        voorbehouden.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { useHead } from "#imports";
import Logo from "~/components/Logo.vue";

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
