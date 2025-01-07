<template>
  <div class="text-text">
    <Breadcrumb />

    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-primary">
      Nederlandse Feestdagen {{ selectedYear }}
    </h1>

    <div class="mb-4">
      <label for="year" class="mr-2 text-text">Selecteer jaar:</label>
      <select
        id="year"
        v-model="selectedYear"
        class="border border-secondary rounded p-2 bg-background text-text"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <div class="bg-primary bg-opacity-10 p-4 md:p-6 rounded-lg shadow-md">
      <ul class="space-y-2">
        <li
          v-for="holiday in filteredHolidays"
          :key="holiday.date"
          class="flex flex-col md:flex-row justify-between items-center"
        >
          <span class="text-text">{{ holiday.name }}</span>
          <div class="text-center md:text-right">
            <span class="text-accent">{{ holiday.date }}</span>
            <span class="text-secondary font-bold ml-2"
              >({{ holiday.day }})</span
            >
          </div>
        </li>
      </ul>
    </div>

    <div v-if="selectedYear === 2025" class="mt-4 p-4 bg-yellow-100 rounded-lg">
      <p class="font-semibold">Opmerking voor 2025:</p>
      <p>
        Koningsdag wordt in 2025 een dag eerder gevierd (26 april), omdat 27
        april op een zondag valt.
      </p>
    </div>

    <section class="mt-8">
      <h2 class="text-1xl md:text-2xl font-semibold mb-4 text-primary">
        Over Nederlandse Feestdagen
      </h2>
      <p class="mb-4">
        Nederlandse feestdagen zijn een belangrijk onderdeel van de Nederlandse
        cultuur en traditie. Ze markeren belangrijke historische, religieuze en
        culturele momenten in het jaar. Van Koningsdag tot Sinterklaas, deze
        dagen brengen mensen samen en bieden momenten van bezinning, viering en
        ontspanning.
      </p>
      <p>
        Gebruik onze handige kalender om alle officiële feestdagen in Nederland
        te bekijken en plan uw vrije dagen en vieringen met gemak vooruit.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Breadcrumb from "~/components/Breadcrumb.vue";

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

const holidays = {
  2025: [
    { name: "Nieuwjaarsdag", date: "1 januari 2025" },
    { name: "Goede Vrijdag", date: "18 april 2025" },
    { name: "Eerste Paasdag", date: "20 april 2025" },
    { name: "Tweede Paasdag", date: "21 april 2025" },
    { name: "Koningsdag", date: "26 april 2025" },
    { name: "Bevrijdingsdag", date: "5 mei 2025" },
    { name: "Hemelvaartsdag", date: "29 mei 2025" },
    { name: "Eerste Pinksterdag", date: "8 juni 2025" },
    { name: "Tweede Pinksterdag", date: "9 juni 2025" },
    { name: "Eerste Kerstdag", date: "25 december 2025" },
    { name: "Tweede Kerstdag", date: "26 december 2025" },
  ],
  2026: [
    { name: "Nieuwjaarsdag", date: "1 januari 2026" },
    { name: "Goede Vrijdag", date: "3 april 2026" },
    { name: "Eerste Paasdag", date: "5 april 2026" },
    { name: "Tweede Paasdag", date: "6 april 2026" },
    { name: "Koningsdag", date: "27 april 2026" },
    { name: "Bevrijdingsdag", date: "5 mei 2026" },
    { name: "Hemelvaartsdag", date: "14 mei 2026" },
    { name: "Eerste Pinksterdag", date: "24 mei 2026" },
    { name: "Tweede Pinksterdag", date: "25 mei 2026" },
    { name: "Eerste Kerstdag", date: "25 december 2026" },
    { name: "Tweede Kerstdag", date: "26 december 2026" },
  ],
};

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
