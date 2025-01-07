<template>
  <div class="text-text">
    <Breadcrumb />

    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-primary">
      Contact Wanneer Vrij
    </h1>

    <section>
      <p class="mb-4">
        Heb je vragen, opmerkingen of suggesties? Neem gerust contact met ons op
        via onderstaand formulier.
      </p>
    </section>

    <div class="flex flex-col space-y-6">
      <section class="bg-primary bg-opacity-10 p-4 md:p-6 rounded-lg shadow-md">
        <h2 class="text-1xl md:text-2xl font-semibold mb-4 text-primary">
          Neem Contact Op
        </h2>
        <form class="space-y-4" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Naam</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >E-mail</label
            >
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Bericht</label
            >
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              required
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 disabled:opacity-50"
          >
            {{ isSubmitting ? "Verzenden..." : "Verstuur Bericht" }}
          </button>
        </form>
        <div
          v-if="submitStatus"
          :class="[
            'mt-4 p-3 rounded',
            submitStatus.success
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700',
          ]"
        >
          {{ submitStatus.message }}
        </div>
      </section>

      <section>
        <h2 class="text-1xl md:text-2xl font-semibold mt-8 mb-4 text-primary">
          Veelgestelde Vragen
        </h2>
        <div class="space-y-4">
          <details class="bg-white p-4 rounded-lg shadow-md">
            <summary class="font-semibold cursor-pointer">
              Hoe vaak wordt de vakantie-informatie bijgewerkt?
            </summary>
            <p class="mt-2">
              Onze vakantie-informatie wordt dagelijks gecontroleerd en
              bijgewerkt om de meest actuele gegevens te garanderen.
            </p>
          </details>
          <details class="bg-white p-4 rounded-lg shadow-md">
            <summary class="font-semibold cursor-pointer">
              Zijn de schoolvakanties voor alle regio's beschikbaar?
            </summary>
            <p class="mt-2">
              Ja, we bieden informatie over schoolvakanties voor alle regio's in
              Nederland: Noord, Midden en Zuid.
            </p>
          </details>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Breadcrumb from "~/components/Breadcrumb.vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref(null);

const submitForm = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(
        "Er is iets misgegaan bij het verzenden van het formulier.",
      );
    }

    submitStatus.value = {
      success: true,
      message:
        "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
    };

    // Reset het formulier
    form.name = "";
    form.email = "";
    form.message = "";
  } catch {
    submitStatus.value = {
      success: false,
      message:
        "Er is een fout opgetreden bij het verzenden van je bericht. Probeer het later opnieuw.",
    };
  } finally {
    isSubmitting.value = false;
  }
};

useHead({
  title:
    "Contact - Wanneer Vrij | Neem Contact Op voor Vragen over Nederlandse Vakanties",
  meta: [
    {
      name: "description",
      content:
        "Heb je vragen over Nederlandse feestdagen of schoolvakanties? Neem contact op met Wanneer Vrij. We staan klaar om je te helpen met al je vragen over vrijetijdsplanning.",
    },
    {
      name: "keywords",
      content:
        "contact, Wanneer Vrij, Nederlandse feestdagen, schoolvakanties, klantenservice, vragen",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://wanneervrij.nl/contact",
    },
  ],
});

// Structured data voor de contactpagina
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Wanneer Vrij",
  "description": "Contactpagina van Wanneer Vrij voor vragen over Nederlandse feestdagen en schoolvakanties.",
  "url": "https://wanneervrij.nl/contact",
  "mainEntity": {
    "@type": "ContactPoint",
    "telephone": "+31 20 123 4567",
    "contactType": "customer service",
    "email": "info@wanneervrij.nl",
    "areaServed": "NL",
    "availableLanguage": ["Dutch", "English"]
  }
};

useHead({
  script: [
    { innerHTML: JSON.stringify(structuredData), type: "application/ld+json" },
  ],
});
</script>
