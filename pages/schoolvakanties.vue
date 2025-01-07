<template>
  <div class="text-text">
    <h1 class="text-3xl font-bold mb-4 text-primary">Schoolvakanties</h1>

    <!-- Introductietekst -->
    <div class="mb-8 space-y-6 md:max-w-2xl">
      <p>
        Benieuwd wanneer de volgende schoolvakantie is? Op
        <NuxtLink to="/" class="text-accent hover:underline"
          >WanneerVrij.nl</NuxtLink
        >
        vind je een overzicht van alle schoolvakanties in Nederland. Of je nu
        plannen maakt voor een vakantie, een dagje uit of gewoon wilt weten
        wanneer je kinderen vrij zijn, hier ben je altijd goed geïnformeerd.
      </p>

      <div>
        <h2 class="text-2xl font-semibold mb-3 text-primary">
          Waarom zijn schoolvakanties belangrijk?
        </h2>
        <p>
          Schoolvakanties bieden een broodnodige pauze voor zowel leerlingen als
          leraren. Het is een tijd om bij te komen, op te laden en quality time
          door te brengen met het gezin. Veel gezinnen plannen hun vakanties
          rond deze periodes, en daarom is het handig om ruim van tevoren te
          weten wanneer de vakanties plaatsvinden.
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-3 text-primary">
          Actuele data voor schoolvakanties
        </h2>
        <p>
          Op deze pagina vind je een up-to-date overzicht van alle
          schoolvakanties voor het lopende en komende schooljaar, waaronder:
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-3 text-primary">
          Regio-indeling van vakanties
        </h2>
        <p>
          Nederland is verdeeld in drie regio's: Noord, Midden en Zuid. Dit
          betekent dat vakantiedata kunnen verschillen per regio. Op
          <NuxtLink to="/" class="text-accent hover:underline"
            >WanneerVrij.nl</NuxtLink
          >
          vind je snel en eenvoudig de juiste vakantiedata voor jouw regio.
        </p>
      </div>
    </div>

    <div v-if="isLoading" class="text-text">Laden...</div>
    <div v-else-if="error" class="text-accent">
      Er is een fout opgetreden bij het laden van de data.
    </div>
    <div v-else-if="groupedAndSortedVacations.length === 0" class="text-accent">
      Geen toekomstige vakanties gevonden.
    </div>
    <div v-else class="space-y-6">
      <div
        v-for="vacation in groupedAndSortedVacations"
        :key="vacation.type"
        class="bg-primary bg-opacity-10 p-6 rounded-lg shadow-md"
      >
        <h2 class="text-2xl font-semibold mb-4 text-primary">
          {{ vacation.type.trim() }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="region in getActiveRegions(vacation)"
            :key="region"
            class="bg-background p-4 rounded-lg shadow"
          >
            <h3 class="text-lg font-medium mb-2 text-accent">
              {{ capitalizeFirstLetter(region) }}
            </h3>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  useVacations,
  formatDateRange,
  capitalizeFirstLetter,
} from "../utils/vacationUtils";

const {
  isLoading,
  error,
  groupedAndSortedVacations,
  getActiveRegions,
  fetchVacations,
} = useVacations();

onMounted(fetchVacations);
</script>
