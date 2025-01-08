<template>
  <div class="text-text dark:text-gray-100">
    <Breadcrumb />

    <h1
      class="text-2xl md:text-3xl font-bold mb-6 text-primary dark:text-gray-100"
    >
      Wanneer Vrij – Alle Feestdagen en Schoolvakanties in Één Overzicht
    </h1>

    <div class="mb-8 space-y-6">
      <p>
        Welkom op WanneerVrij.nl – dé plek waar je in één oogopslag alle
        Nederlandse feestdagen en schoolvakanties kunt vinden. Of je nu je
        volgende vakantie wilt plannen, een vrije dag wilt benutten, of gewoon
        wilt weten wanneer je kinderen vrij zijn, bij ons ben je aan het juiste
        adres.
      </p>

      <div>
        <h2
          class="text-1xl md:text-2xl font-semibold mb-3 text-primary dark:text-gray-200"
        >
          Altijd Actuele Data
        </h2>
        <p>Op Wanneer Vrij houden we je op de hoogte van:</p>
        <ul class="list-disc list-inside mt-2 dark:text-gray-300">
          <li>
            Nationale en regionale feestdagen, zoals Koningsdag, Pasen en
            Kerstmis.
          </li>
          <li>Schoolvakanties per regio (Noord, Midden en Zuid).</li>
          <li>Andere belangrijke vrije dagen en evenementen.</li>
        </ul>
        <p class="mt-2">
          Met onze actuele en overzichtelijke kalender weet je precies wanneer
          je kunt genieten van je welverdiende rust.
        </p>
      </div>

      <div>
        <h2
          class="text-1xl md:text-2xl font-semibold mb-3 text-primary dark:text-gray-200"
        >
          Waarom Wanneer Vrij?
        </h2>
        <ul class="list-none mt-2 dark:text-gray-300">
          <li>
            ✔ Altijd up-to-date: Wij zorgen ervoor dat je de meest recente
            informatie hebt.
          </li>
          <li>
            ✔ Gebruiksvriendelijk: Vind snel en eenvoudig de data die je zoekt.
          </li>
          <li>
            ✔ Perfect voor gezinnen: Plan je vakanties en vrije dagen
            moeiteloos.
          </li>
        </ul>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 md:p-6 rounded-lg shadow-md relative flex flex-col min-h-[300px]"
      >
        <h2
          class="text-1xl md:text-2xl font-semibold mb-4 text-primary dark:text-gray-200"
        >
          Nationale Feestdagen
        </h2>
        <ul class="space-y-2 flex-grow">
          <li
            v-for="holiday in holidays"
            :key="holiday.date"
            class="flex flex-col justify-between"
          >
            <span class="text-text dark:text-gray-300">{{ holiday.name }}</span>
            <span class="text-accent dark:text-accent-light">{{
              holiday.date
            }}</span>
          </li>
        </ul>
        <NuxtLink
          to="/feestdagen"
          class="mt-4 inline-block text-accent hover:text-primary transition-colors duration-200 dark:text-accent-light dark:hover:text-primary-light"
        >
          Bekijk alle feestdagen
        </NuxtLink>
      </div>
      <div
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 md:p-6 rounded-lg shadow-md relative flex flex-col min-h-[300px]"
      >
        <h2
          class="text-1xl md:text-2xl font-semibold mb-4 text-primary dark:text-gray-200"
        >
          Eerstkomende Schoolvakanties
        </h2>
        <div v-if="isLoading" class="my-8 flex-grow">
          <LoadingSpinner />
        </div>
        <div v-else-if="error" class="text-accent dark:text-red-400 flex-grow">
          Er is een fout opgetreden bij het laden van de data.
        </div>
        <div
          v-else-if="upcomingVacations.length === 0"
          class="text-accent dark:text-yellow-400 flex-grow"
        >
          Geen toekomstige vakanties gevonden.
        </div>
        <div v-else class="flex-grow">
          <div
            v-for="vacation in upcomingVacations"
            :key="vacation.type"
            class="mb-4"
          >
            <h3
              class="text-lg font-medium mb-2 text-accent dark:text-accent-light"
            >
              {{ vacation.type }}
            </h3>
            <div
              v-for="region in getActiveRegions(vacation)"
              :key="region"
              class="mb-2"
            >
              <span class="font-semibold dark:text-gray-300"
                >{{ capitalizeFirstLetter(region) }}:{{ " " }}
              </span>
              <span class="text-neutral-light dark:text-gray-400">
                {{
                  formatDateRange(
                    vacation.regions[region].startdate,
                    vacation.regions[region].enddate,
                  )
                }}
              </span>
            </div>
          </div>
        </div>
        <NuxtLink
          to="/schoolvakanties"
          class="mt-4 inline-block text-accent hover:text-primary transition-colors duration-200 dark:text-accent-light dark:hover:text-primary-light"
        >
          Bekijk alle schoolvakanties
        </NuxtLink>
      </div>
    </div>

    <div class="mt-8">
      <h2
        class="text-1xl md:text-2xl font-semibold mb-4 text-primary dark:text-gray-200"
      >
        Populaire Pagina's
      </h2>
      <ul class="list-disc list-inside dark:text-gray-300">
        <li>
          <NuxtLink
            to="/feestdagen"
            class="text-accent hover:text-primary transition-colors duration-200 dark:text-accent-light dark:hover:text-primary-light"
          >
            Feestdagen in Nederland: Alle officiële feestdagen op een rij.
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/schoolvakanties"
            class="text-accent hover:text-primary transition-colors duration-200 dark:text-accent-light dark:hover:text-primary-light"
          >
            Schoolvakanties: Bekijk per regio wanneer de scholen gesloten zijn.
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/contact"
            class="text-accent hover:text-primary transition-colors duration-200 dark:text-accent-light dark:hover:text-primary-light"
          >
            Contact: Heb je vragen of opmerkingen? Neem gerust contact met ons
            op.
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import {
  useVacations,
  formatDateRange,
  capitalizeFirstLetter,
} from "../utils/vacationUtils";

const holidays = ref([
  { name: "Koningsdag", date: "zaterdag 26 april 2025" },
  { name: "Bevrijdingsdag", date: "maandag 5 mei 2025" },
  { name: "Hemelvaartsdag", date: "donderdag 29 mei 2025" },
  { name: "Eerste Pinksterdag", date: "zondag 8 juni 2025" },
  { name: "Tweede Pinksterdag", date: "maandag 9 juni 2025" },
]);

useHead({
  title:
    "Wanneer Vrij - Overzicht van Feestdagen en Schoolvakanties in Nederland",
  meta: [
    {
      name: "description",
      content:
        "Vind alle Nederlandse feestdagen en schoolvakanties op één plek. Plan je vrije dagen en vakanties eenvoudig met Wanneer Vrij. Actuele data voor nationale feestdagen en schoolvakanties per regio.",
    },
    {
      name: "keywords",
      content:
        "feestdagen, schoolvakanties, Nederland, vakantieplannen, vrije dagen, Koningsdag, Pasen, Kerstmis, regio Noord, regio Midden, regio Zuid",
    },
    {
      property: "og:title",
      content: "Wanneer Vrij - Feestdagen en Schoolvakanties in Nederland",
    },
    {
      property: "og:description",
      content:
        "Ontdek alle Nederlandse feestdagen en schoolvakanties. Plan slim met Wanneer Vrij!",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.wanneervrij.nl",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Wanneer Vrij - Feestdagen en Schoolvakanties in Nederland",
    },
    {
      name: "twitter:description",
      content:
        "Ontdek alle Nederlandse feestdagen en schoolvakanties. Plan slim met Wanneer Vrij!",
    },
  ],
  link: [{ rel: "canonical", href: "https://wanneervrij.nl" }],
});

// Structured data voor de homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wanneer Vrij",
  url: "https://wanneervrij.nl",
  description: "Overzicht van Nederlandse feestdagen en schoolvakanties",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://wanneervrij.nl/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

useHead({
  script: [
    { innerHTML: JSON.stringify(structuredData), type: "application/ld+json" },
  ],
});

const {
  isLoading,
  error,
  groupedAndSortedVacations,
  getActiveRegions,
  fetchVacations,
} = useVacations();

const upcomingVacations = computed(() => {
  return groupedAndSortedVacations.value.slice(0, 2);
});

onMounted(fetchVacations);
</script>
