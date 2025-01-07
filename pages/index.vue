<template>
  <div class="text-text">
    <h1 class="text-3xl font-bold mb-6 text-primary">
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
        <h2 class="text-2xl font-semibold mb-3 text-primary">
          Altijd Actuele Data
        </h2>
        <p>Op Wanneer Vrij houden we je op de hoogte van:</p>
        <ul class="list-disc list-inside mt-2">
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
        <h2 class="text-2xl font-semibold mb-3 text-primary">
          Waarom Wanneer Vrij?
        </h2>
        <ul class="list-none mt-2">
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

      <div>
        <h2 class="text-2xl font-semibold mb-3 text-primary">
          Plan Slim met Wanneer Vrij
        </h2>
        <p>
          Ben je benieuwd naar de volgende feestdag of schoolvakantie? Maak het
          jezelf makkelijk en gebruik onze tools om jouw jaar slim te plannen.
          Van lange weekenden tot zomervakanties, wij helpen je om het maximale
          uit je vrije tijd te halen.
        </p>
      </div>
    </div>

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
        <div v-if="isLoading" class="my-8">
          <LoadingSpinner />
        </div>
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

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4 text-primary">
        Populaire Pagina's
      </h2>
      <ul class="list-disc list-inside">
        <li>
          <NuxtLink
            to="/feestdagen"
            class="text-accent hover:text-primary transition-colors duration-200"
          >
            Feestdagen in Nederland: Alle officiële feestdagen op een rij.
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/schoolvakanties"
            class="text-accent hover:text-primary transition-colors duration-200"
          >
            Schoolvakanties: Bekijk per regio wanneer de scholen gesloten zijn.
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/contact"
            class="text-accent hover:text-primary transition-colors duration-200"
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
