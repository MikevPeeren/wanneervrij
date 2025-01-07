<template>
  <footer class="bg-primary text-background text-sm py-6 mt-8" >
    <div class="container max-w-3xl mx-auto px-4">
      <div class="flex flex-wrap justify-between items-start text-center">
        <div class="w-full md:w-2/4 mb-4 md:mb-0 flex flex-col">
          <!-- About Section -->
          <div class="w-full mb-4">
            <h3 class="text-lg font-medium mb-2">Over Wanneer Vrij</h3>
            <p>
              WanneerVrij.nl biedt een compleet overzicht van alle feestdagen en
              schoolvakanties in Nederland. Plan je vrije dagen en vakanties
              moeiteloos met onze actuele kalender en handige tools.
            </p>
          </div>

          <!-- Contact Info -->
          <div class="w-full">
            <h3 class="text-lg font-medium mb-2 max-w-prose">Contact</h3>
            <p>
              Heb je vragen of opmerkingen? Neem gerust contact met ons op via
              het
              <a
                href="/contact"
                class="hover:underline font-semibold underline hover:text-secondary transition-colors duration-200"
                >Contact</a
              >
              formulier
            </p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="w-full md:w-1/3 mb-4 md:mb-0">
          <h3 class="text-lg font-medium mb-2">Handige Links</h3>
          <ul class="space-y-2">
            <li><a href="/" class="hover:underline">Home</a></li>
            <li>
              <a href="/feestdagen" class="hover:underline">Feestdagen</a>
            </li>
            <li>
              <a href="/schoolvakanties" class="hover:underline"
                >Schoolvakanties</a
              >
            </li>
            <li><a href="/over-ons" class="hover:underline">Over ons</a></li>
            <li><a href="/contact" class="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-6 border-t pt-4 text-center text-xs">
        <p>
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
