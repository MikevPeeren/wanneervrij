<template>
  <div class="max-w-2xl text-text">
    <Breadcrumb />

    <h1 class="text-3xl font-bold mb-6 text-primary">Contact</h1>

    <div class="bg-primary bg-opacity-10 p-6 rounded-lg shadow-md">
      <p class="mb-4">
        Heb je vragen, opmerkingen of suggesties? Neem gerust contact met ons op
        via onderstaand formulier.
      </p>
      <form class="space-y-4" @submit.prevent="submitForm">
        <div>
          <label for="name" class="block mb-1">Naam</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            required
            class="w-full border border-secondary rounded p-2 bg-background text-text"
          />
        </div>
        <div>
          <label for="email" class="block mb-1">E-mail</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            required
            class="w-full border border-secondary rounded p-2 bg-background text-text"
          />
        </div>
        <div>
          <label for="message" class="block mb-1">Bericht</label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            required
            class="w-full border border-secondary rounded p-2 h-32 bg-background text-text"
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-accent text-background px-4 py-2 rounded hover:bg-primary transition-colors duration-200 disabled:opacity-50"
        >
          {{ isSubmitting ? "Verzenden..." : "Verstuur" }}
        </button>
      </form>
      <p
        v-if="submitStatus"
        :class="submitStatus.success ? 'text-green-600' : 'text-red-600'"
        class="mt-4"
      >
        {{ submitStatus.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

useHead({
  title: "Contact - Wanneer Vrij",
  meta: [
    {
      name: "description",
      content:
        "Neem contact op met Wanneer Vrij voor vragen over Nederlandse feestdagen en schoolvakanties of voor feedback over onze diensten.",
    },
  ],
});

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

    form.name = "";
    form.email = "";
    form.message = "";
  } catch {
    submitStatus.value = {
      success: false,
      message:
        "Er is een fout opgetreden bij het verzenden van het formulier. Probeer het later opnieuw.",
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
