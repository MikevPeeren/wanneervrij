<template>
  <div class="text-text">
    <h1 class="text-3xl font-bold mb-6 text-primary">
      Welkom bij Weekend Vrij
    </h1>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-primary bg-opacity-10 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-primary">
          Nationale Feestdagen
        </h2>
        <ul class="space-y-2">
          <li
            v-for="holiday in holidays"
            :key="holiday.date"
            class="flex justify-between"
          >
            <span class="text-text">{{ holiday.name }}</span>
            <span class="text-accent">{{ holiday.date }}</span>
          </li>
        </ul>
        <NuxtLink
          to="/feestdagen"
          class="mt-4 inline-block text-accent hover:text-primary transition-colors duration-200"
        >
          Bekijk alle feestdagen
        </NuxtLink>
      </div>
      <div class="bg-primary bg-opacity-10 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-primary">
          Schoolvakanties
        </h2>
        <div v-for="region in regions" :key="region" class="mb-4">
          <h3 class="text-lg font-medium mb-2 text-accent">{{ region }}</h3>
          <ul class="space-y-2">
            <li
              v-for="vacation in vacations[region]"
              :key="vacation.name"
              class="flex justify-between"
            >
              <span class="text-text">{{ vacation.name }}</span>
              <span class="text-secondary">{{ vacation.date }}</span>
            </li>
          </ul>
        </div>
        <NuxtLink
          to="/schoolvakanties"
          class="mt-4 inline-block text-accent hover:text-primary transition-colors duration-200"
        >
          Bekijk alle schoolvakanties
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const holidays = [
  { name: "Nieuwjaarsdag", date: "1 januari 2025" },
  { name: "Koningsdag", date: "27 april 2025" },
  { name: "Bevrijdingsdag", date: "5 mei 2025" },
  // Voeg meer feestdagen toe
];

const regions = ["Noord", "Midden", "Zuid"];
const vacations = {
  Noord: [
    { name: "Voorjaarsvakantie", date: "22 feb - 2 mrt 2025" },
    { name: "Meivakantie", date: "26 apr - 4 mei 2025" },
    // Voeg meer vakanties toe
  ],
  Midden: [
    { name: "Voorjaarsvakantie", date: "15 feb - 23 feb 2025" },
    { name: "Meivakantie", date: "26 apr - 4 mei 2025" },
    // Voeg meer vakanties toe
  ],
  Zuid: [
    { name: "Voorjaarsvakantie", date: "15 feb - 23 feb 2025" },
    { name: "Meivakantie", date: "26 apr - 4 mei 2025" },
    // Voeg meer vakanties toe
  ],
};
</script>
