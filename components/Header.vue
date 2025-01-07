<template>
  <header class="bg-primary text-background shadow-md">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <Logo />
      </NuxtLink>
      <ul class="flex space-x-4">
        <ThemeToggle />
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
</template>

<script setup>
import Logo from "./Logo.vue";
import ThemeToggle from "./ThemeToggle.vue";

defineOptions({
  name: "SiteHeader",
});
</script>
