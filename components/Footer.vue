<template>
  <footer
    class="bg-primary dark:bg-gray-800 text-background dark:text-white text-sm py-6 mt-8 transition-colors duration-300"
  >
    <div class="container max-w-3xl mx-auto px-4">
      <div class="flex flex-wrap justify-between items-start text-center">
        <div class="w-full md:w-2/4 mb-4 md:mb-0 flex flex-col">
          <!-- About Section -->
          <div class="w-full mb-4">
            <h3 class="text-lg font-medium mb-2">Over Wanneer Vrij</h3>
            <p class="dark:text-gray-300">
              WanneerVrij.nl biedt een compleet overzicht van alle feestdagen en
              schoolvakanties in Nederland. Plan je vrije dagen en vakanties
              moeiteloos met onze actuele kalender en handige tools.
            </p>
          </div>

          <!-- Contact Info -->
          <div class="w-full">
            <h3 class="text-lg font-medium mb-2 max-w-prose">Contact</h3>
            <p class="dark:text-gray-300">
              Heb je vragen of opmerkingen? Neem gerust contact met ons op via
              het
              <NuxtLink
                to="/contact"
                class="hover:underline font-semibold underline hover:text-secondary dark:hover:text-gray-300 transition-colors duration-200"
                >Contact</NuxtLink
              >
              formulier
            </p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="w-full md:w-1/3 mb-4 md:mb-0">
          <h3 class="text-lg font-medium mb-2">Handige Links</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="hover:underline hover:text-secondary dark:hover:text-gray-300 transition-colors duration-200"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/feestdagen"
                class="hover:underline hover:text-secondary dark:hover:text-gray-300 transition-colors duration-200"
                >Feestdagen</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/schoolvakanties"
                class="hover:underline hover:text-secondary dark:hover:text-gray-300 transition-colors duration-200"
                >Schoolvakanties</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/over-ons"
                class="hover:underline hover:text-secondary dark:hover:text-gray-300 transition-colors duration-200"
                >Over ons</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="hover:underline hover:text-secondary dark:hover:text-gray-300 transition-colors duration-200"
                >Contact</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-6 border-t border-gray-600 dark:border-gray-700 pt-4 text-center text-xs"
      >
        <p class="dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} Wanneer Vrij. Alle rechten
          voorbehouden.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineOptions({
  name: "SiteFooter",
});
</script>
