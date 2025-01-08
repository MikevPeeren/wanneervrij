<template>
  <div class="text-text dark:text-gray-100">
    <Breadcrumb />

    <h1
      class="text-2xl md:text-3xl font-bold mb-4 text-primary dark:text-gray-100"
    >
      Schoolvakanties
    </h1>

    <!-- Introductie tekst -->
    <div class="mb-8 space-y-6 md:max-w-2xl">
      <p>
        Benieuwd wanneer de volgende schoolvakantie is? Op
        <NuxtLink
          to="/"
          class="text-accent hover:underline dark:text-accent-light"
          >WanneerVrij.nl</NuxtLink
        >
        vind je een overzicht van alle schoolvakanties in Nederland. Of je nu
        plannen maakt voor een vakantie, een dagje uit of gewoon wilt weten
        wanneer je kinderen vrij zijn, hier ben je altijd goed geïnformeerd.
      </p>

      <div>
        <h2
          class="text-1xl md:text-2xl font-semibold mb-3 text-primary dark:text-gray-200"
        >
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
        <h2
          class="text-1xl md:text-2xl font-semibold mb-3 text-primary dark:text-gray-200"
        >
          Actuele data voor schoolvakanties
        </h2>
        <p>
          Op deze pagina vind je een up-to-date overzicht van alle
          schoolvakanties voor het lopende en komende schooljaar, waaronder:
        </p>
      </div>

      <div>
        <h2
          class="text-1xl md:text-2xl font-semibold mb-3 text-primary dark:text-gray-200"
        >
          Regio-indeling van vakanties
        </h2>
        <p>
          Nederland is verdeeld in drie regio's: Noord, Midden en Zuid. Dit
          betekent dat vakantiedata kunnen verschillen per regio. Op
          <NuxtLink
            to="/"
            class="text-accent hover:underline dark:text-accent-light"
            >WanneerVrij.nl</NuxtLink
          >
          vind je snel en eenvoudig de juiste vakantiedata voor jouw regio.
        </p>
      </div>
    </div>

    <div v-if="isLoading" class="my-8">
      <LoadingSpinner />
    </div>
    <div v-else-if="error" class="text-accent dark:text-red-400">
      Er is een fout opgetreden bij het laden van de data.
    </div>
    <div
      v-else-if="groupedAndSortedVacations.length === 0"
      class="text-accent dark:text-yellow-400"
    >
      Geen toekomstige vakanties gevonden.
    </div>
    <div v-else class="space-y-6">
      <div
        v-for="vacation in groupedAndSortedVacations"
        :key="vacation.type"
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 md:p-6 rounded-lg shadow-md"
      >
        <h2
          class="text-1xl md:text-2xl font-semibold mb-4 text-primary dark:text-gray-200"
        >
          {{ vacation.type.trim() }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            v-for="region in getActiveRegions(vacation)"
            :key="region"
            class="bg-background dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 class="text-lg font-medium mb-2 text-accent dark:text-gray-300">
              {{ capitalizeFirstLetter(region) }}
            </h3>
            <p class="text-neutral-light dark:text-gray-400">
              {{
                formatDateRange(
                  vacation.regions[region].startdate,
                  vacation.regions[region].enddate,
                )
              }}
            </p>
          </div>
        </div>

        <!-- Nieuwe sectie met gedetailleerde vakantie-informatie -->
        <div
          v-if="vacationInfo[vacation.type.trim() as keyof typeof vacationInfo]"
          class="mt-6 space-y-4"
        >
          <p class="dark:text-gray-300">
            {{
              vacationInfo[vacation.type.trim() as keyof typeof vacationInfo]
                .description
            }}
          </p>
          <div>
            <h3 class="text-xl font-medium mb-2 text-accent dark:text-gray-300">
              {{
                vacationInfo[vacation.type.trim() as keyof typeof vacationInfo]
                  .whenTitle
              }}
            </h3>
            <p class="dark:text-gray-300">
              {{
                vacationInfo[vacation.type.trim() as keyof typeof vacationInfo]
                  .whenDescription
              }}
            </p>
          </div>
          <div>
            <h3 class="text-xl font-medium mb-2 text-accent dark:text-gray-300">
              {{
                vacationInfo[vacation.type.trim() as keyof typeof vacationInfo]
                  .tipsTitle
              }}
            </h3>
            <ul class="list-disc list-inside dark:text-gray-300">
              <li
                v-for="tip in vacationInfo[
                  vacation.type.trim() as keyof typeof vacationInfo
                ].tips"
                :key="tip"
              >
                {{ tip }}
              </li>
            </ul>
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

useHead({
  title: "Schoolvakanties Nederland - Wanneer Vrij",
  meta: [
    {
      name: "description",
      content:
        "Compleet overzicht van alle schoolvakanties in Nederland voor 2025. Vind data voor voorjaars-, mei-, zomer-, herfst- en kerstvakantie, plus tips en activiteiten voor elke vakantieperiode. Plan slim met Wanneer Vrij!",
    },
    {
      name: "keywords",
      content:
        "schoolvakanties, voorjaarsvakantie, meivakantie, zomervakantie, herfstvakantie, kerstvakantie, Nederland, 2025, vakantiedata, regio Noord, regio Midden, regio Zuid",
    },
    {
      property: "og:title",
      content:
        "Schoolvakanties Nederland 2025 - Overzicht en Tips | Wanneer Vrij",
    },
    {
      property: "og:description",
      content:
        "Vind data en tips voor alle Nederlandse schoolvakanties in 2025. Plan je vakantie slim met Wanneer Vrij!",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.wanneervrij.nl/schoolvakanties",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Schoolvakanties Nederland 2025 - Overzicht en Tips",
    },
    {
      name: "twitter:description",
      content:
        "Vind data en tips voor alle Nederlandse schoolvakanties in 2025. Plan je vakantie slim met Wanneer Vrij!",
    },
  ],
  link: [{ rel: "canonical", href: "https://wanneervrij.nl/schoolvakanties" }],
});

// Structured data voor de schoolvakanties pagina
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SpecialAnnouncement",
  name: "Schoolvakanties in Nederland",
  description: "Overzicht van alle schoolvakanties in Nederland per regio",
  url: "https://wanneervrij.nl/schoolvakanties",
  datePosted: new Date().toISOString(),
  expires: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
  category: "https://www.wikidata.org/wiki/Q2385804",
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

const {
  isLoading,
  error,
  groupedAndSortedVacations,
  getActiveRegions,
  fetchVacations,
} = useVacations();

type VacationInfoType = {
  description: string;
  whenTitle: string;
  whenDescription: string;
  tipsTitle: string;
  tips: string[];
};

type VacationInfoMap = {
  [key: string]: VacationInfoType;
};

const vacationInfo = {
  Voorjaarsvakantie: {
    description:
      "Tijd voor een frisse start! De voorjaarsvakantie, ook wel krokusvakantie genoemd, is een ideale pauze in de winter. Het is een moment om even op adem te komen na de drukte van het nieuwe jaar.",
    whenTitle: "Wanneer is de voorjaarsvakantie?",
    whenDescription:
      "De voorjaarsvakantie vindt meestal plaats in februari en de data verschillen per regio (Noord, Midden en Zuid). Controleer eenvoudig jouw vakantiedata op WanneerVrij.nl.",
    tipsTitle: "Tips voor de voorjaarsvakantie:",
    tips: [
      "Geniet van een dagje schaatsen of wintersport.",
      "Bezoek een museum of indoor attractiepark.",
      "Plan een gezellige familiebrunch of uitje.",
    ],
  },
  Meivakantie: {
    description:
      "Voorjaar vol avonturen! De meivakantie luidt de lente in en is dé kans om te genieten van het heerlijke voorjaarsweer.",
    whenTitle: "Meivakantie data in Nederland",
    whenDescription:
      "Hoewel de officiële meivakantie één week duurt, krijgen veel scholen een extra week vrij. Op WanneerVrij.nl zie je in één oogopslag of jouw regio profiteert van een langere vakantie.",
    tipsTitle: "Leuke activiteiten voor de meivakantie:",
    tips: [
      "Bezoek een pretpark of dierentuin.",
      "Ontdek de Nederlandse stranden of natuurgebieden.",
      "Combineer Koningsdag en de vakantie voor een feestelijke week.",
    ],
  },
  Zomervakantie: {
    description:
      "Het hoogtepunt van het jaar! De zomervakantie is de langste en meest populaire vakantie van het schooljaar.",
    whenTitle: "Hoe lang duurt de zomervakantie?",
    whenDescription:
      "De zomervakantie duurt zes weken, met start- en einddata die per regio verschillen. Bekijk de actuele planning op WanneerVrij.nl.",
    tipsTitle: "Inspiratie voor de zomervakantie:",
    tips: [
      "Boek een campingtrip of vakantiehuisje.",
      "Organiseer picknicks en buitenactiviteiten.",
      "Laat je kinderen genieten van zomerkampen of sportclinics.",
    ],
  },
  Herfstvakantie: {
    description:
      "Geniet van de kleuren van het seizoen. De herfstvakantie is een perfecte gelegenheid om te genieten van het najaar.",
    whenTitle: "Wanneer is de herfstvakantie?",
    whenDescription:
      "De herfstvakantie valt meestal eind oktober, en de data verschillen per regio. Plan je vakantie gemakkelijk met de hulp van WanneerVrij.nl.",
    tipsTitle: "Activiteiten tijdens de herfstvakantie:",
    tips: [
      "Maak een boswandeling en verzamel herfstbladeren.",
      "Bezoek een pompoenboerderij of herfstmarkt.",
      "Geniet van indoor activiteiten zoals bowlen of een filmavond.",
    ],
  },
  Kerstvakantie: {
    description:
      "Magische dagen in de winter. De kerstvakantie is een van de gezelligste periodes van het jaar.",
    whenTitle: "Wat maakt de kerstvakantie bijzonder?",
    whenDescription:
      "De kerstvakantie duurt twee weken en valt altijd in december en januari. Het is een geweldige tijd voor winterse uitstapjes, feestelijke diners en natuurlijk cadeaus uitpakken.",
    tipsTitle: "Winterse ideeën voor de kerstvakantie:",
    tips: [
      "Bezoek een kerstmarkt of schaatsbaan.",
      "Plan een familiediner of spelletjesavond.",
      "Ga op wintersport of geniet van een korte vakantie in eigen land.",
    ],
  },
} as VacationInfoMap;

onMounted(fetchVacations);
</script>
