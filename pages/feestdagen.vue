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

useHead({
  title: `Nederlandse Feestdagen ${new Date().getFullYear()} - Wanneer Vrij`,
  meta: [
    {
      name: "description",
      content: `Compleet overzicht van alle officiële Nederlandse feestdagen voor ${currentYear} en komende jaren. Plan uw vrije dagen en feesten met Wanneer Vrij.`,
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

const selectedYear = ref(new Date().getFullYear());
const years = [2025, 2026, 2027, 2028, 2029];

const holidays = [
  { name: "Nieuwjaarsdag", date: "1 januari" },
  { name: "Goede Vrijdag", date: "18 april" },
  { name: "Eerste Paasdag", date: "20 april" },
  { name: "Tweede Paasdag", date: "21 april" },
  { name: "Koningsdag", date: "27 april" },
  { name: "Bevrijdingsdag", date: "5 mei" },
  { name: "Hemelvaartsdag", date: "29 mei" },
  { name: "Eerste Pinksterdag", date: "8 juni" },
  { name: "Tweede Pinksterdag", date: "9 juni" },
  { name: "Eerste Kerstdag", date: "25 december" },
  { name: "Tweede Kerstdag", date: "26 december" },
];

const getDayName = (dateString, year) => {
  const [day, month] = dateString.split(" ");
  const date = new Date(
    `${year}-${getMonthNumber(month)}-${day.padStart(2, "0")}`,
  );
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
  return holidays.map((holiday) => {
    const [day, month] = holiday.date.split(" ");
    const fullDate = `${day} ${month} ${selectedYear.value}`;
    const dayName = getDayName(holiday.date, selectedYear.value);
    return {
      ...holiday,
      date: fullDate,
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
    };
  });
});

// Structured data voor de feestdagen pagina
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SpecialAnnouncement",
  name: `Nederlandse Feestdagen ${currentYear}`,
  description: `Overzicht van alle officiële Nederlandse feestdagen voor ${currentYear} en komende jaren`,
  url: "https://wanneervrij.nl/feestdagen",
  datePosted: new Date().toISOString(),
  expires: new Date(currentYear + 1, 0, 1).toISOString(),
  category: "https://www.wikidata.org/wiki/Q1197685",
  spatialCoverage: {
    "@type": "Country",
    name: "Nederland",
  },
};

useHead({
  script: [
    { innerHTML: JSON.stringify(structuredData), type: "application/ld+json" },
  ],
});
</script>
