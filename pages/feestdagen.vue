<template>
  <div class="text-text dark:text-gray-100">
    <Breadcrumb />

    <h1
      class="text-2xl md:text-3xl font-bold mb-6 text-primary dark:text-gray-100"
    >
      Nederlandse Feestdagen {{ selectedYear }}
    </h1>

    <div class="mb-4">
      <label for="year-select" class="mr-2 dark:text-gray-300"
        >Selecteer jaar:</label
      >
      <select
        id="year-select"
        v-model="selectedYear"
        class="border border-secondary rounded p-2 bg-background text-text dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <div
      class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 md:p-6 rounded-lg shadow-md"
    >
      <ul class="space-y-2">
        <li
          v-for="holiday in filteredHolidays"
          :key="holiday.date"
          class="flex flex-col md:flex-row justify-between items-center"
        >
          <span class="text-text dark:text-gray-300">{{ holiday.name }}</span>
          <div class="text-center md:text-right">
            <span
              :class="[
                'font-semibold',
                'text-accent hover:text-accent-dark dark:text-accent-dark-light dark:hover:text-accent-dark-base',
                'tabular-nums',
                'transition-colors duration-200',
              ]"
              :aria-label="`Datum: ${holiday.date}`"
            >
              {{ holiday.date }}
            </span>
            <span class="text-secondary dark:text-gray-400 font-bold ml-2"
              >({{ holiday.day }})</span
            >
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="selectedYear === 2025"
      class="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg"
    >
      <p class="font-semibold dark:text-yellow-200">Opmerking voor 2025:</p>
      <p class="dark:text-yellow-100">
        Koningsdag wordt in 2025 een dag eerder gevierd (26 april), omdat 27
        april op een zondag valt.
      </p>
    </div>

    <section class="mt-8">
      <h2
        class="text-1xl md:text-2xl font-semibold mb-4 text-primary dark:text-gray-200"
      >
        Over Nederlandse Feestdagen
      </h2>
      <p class="mb-4 dark:text-gray-300">
        Nederlandse feestdagen zijn een belangrijk onderdeel van de Nederlandse
        cultuur en traditie. Ze markeren belangrijke historische, religieuze en
        culturele momenten in het jaar. Van Koningsdag tot Sinterklaas, deze
        dagen brengen mensen samen en bieden momenten van bezinning, viering en
        ontspanning.
      </p>
      <p class="dark:text-gray-300">
        Gebruik onze handige kalender om alle officiële feestdagen in Nederland
        te bekijken en plan uw vrije dagen en vieringen met gemak vooruit.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Breadcrumb from "~/components/Breadcrumb.vue";
import { holidays } from "~/utils/holidays";

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);
const years = [2025, 2026];

useHead({
  title: `Nederlandse Feestdagen ${selectedYear.value} - Wanneer Vrij`,
  meta: [
    {
      name: "description",
      content: `Compleet overzicht van alle officiële Nederlandse feestdagen voor ${selectedYear.value}. Plan uw vrije dagen en feesten met Wanneer Vrij.`,
    },
    {
      name: "keywords",
      content:
        "Nederlandse feestdagen, officiële feestdagen, vrije dagen, Koningsdag, Kerst, Pasen, Pinksteren, Wanneer Vrij",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `https://wanneervrij.nl/feestdagen`,
    },
  ],
});

const getDayName = (dateString) => {
  const [day, month, year] = dateString.split(" ");
  const date = new Date(`${year}-${getMonthNumber(month)}-${day}`);
  return date.toLocaleDateString("nl-NL", { weekday: "long" });
};

const getMonthNumber = (monthName) => {
  const months = {
    januari: "01",
    februari: "02",
    maart: "03",
    april: "04",
    mei: "05",
    juni: "06",
    juli: "07",
    augustus: "08",
    september: "09",
    oktober: "10",
    november: "11",
    december: "12",
  };
  return months[monthName.toLowerCase()];
};

const filteredHolidays = computed(() => {
  return holidays[selectedYear.value].map((holiday) => {
    const dayName = getDayName(holiday.date);
    return {
      ...holiday,
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
    };
  });
});

// Structured data voor de feestdagen pagina
const structuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "SpecialAnnouncement",
  name: `Nederlandse Feestdagen ${selectedYear.value}`,
  description: `Overzicht van alle officiële Nederlandse feestdagen voor ${selectedYear.value}`,
  url: "https://wanneervrij.nl/feestdagen",
  datePosted: new Date().toISOString(),
  expires: new Date(selectedYear.value + 1, 0, 1).toISOString(),
  category: "https://www.wikidata.org/wiki/Q1197685",
  spatialCoverage: {
    "@type": "Country",
    name: "Nederland",
  },
}));

useHead(() => ({
  script: [
    {
      innerHTML: JSON.stringify(structuredData.value),
      type: "application/ld+json",
    },
  ],
}));
</script>
