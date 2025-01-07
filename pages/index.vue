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
          Eerstkomende Schoolvakanties
        </h2>
        <div v-if="isLoading" class="text-text">Laden...</div>
        <div v-else-if="error" class="text-accent">
          Er is een fout opgetreden bij het laden van de data.
        </div>
        <div v-else-if="upcomingVacations.length === 0" class="text-accent">
          Geen toekomstige vakanties gevonden.
        </div>
        <div v-else>
          <div
            v-for="vacation in upcomingVacations"
            :key="vacation.type"
            class="mb-4"
          >
            <h3 class="text-lg font-medium mb-2 text-accent">
              {{ vacation.type }}
            </h3>
            <div
              v-for="region in getActiveRegions(vacation)"
              :key="region"
              class="mb-2"
            >
              <p class="font-medium">{{ capitalizeFirstLetter(region) }}:</p>
              <p class="text-neutral-light">
                {{
                  formatDateRange(
                    vacation.regions[region].startdate,
                    vacation.regions[region].enddate,
                  )
                }}
              </p>
            </div>
          </div>
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

<script setup lang="ts">
import { onMounted, computed } from "vue";
import {
  useVacations,
  formatDateRange,
  capitalizeFirstLetter,
} from "../utils/vacationUtils";

useHead({
  title:
    "Wanneer Vrij - Overzicht van Feestdagen en Schoolvakanties in Nederland",
  meta: [
    {
      name: "description",
      content:
        "Vind alle Nederlandse feestdagen en schoolvakanties op één plek. Plan je vrije dagen en vakanties eenvoudig met Wanneer Vrij.",
    },
  ],
});

interface Holiday {
  name: string;
  date: string;
}

const holidays: Holiday[] = [
  { name: "Nieuwjaarsdag", date: "1 januari 2025" },
  { name: "Koningsdag", date: "27 april 2025" },
  { name: "Bevrijdingsdag", date: "5 mei 2025" },
  // Voeg meer feestdagen toe
];

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
