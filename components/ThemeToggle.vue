<template>
  <button class="pr-8 rounded-full" @click="$toggleDarkMode()">
    <span v-if="$colorMode.value === 'dark'" class="text-accent-dark-base"
      >☀️</span
    >
    <span v-else class="text-accent">🌙</span>
  </button>
</template>

<script setup>
const { $toggleDarkMode } = useNuxtApp();
</script>
