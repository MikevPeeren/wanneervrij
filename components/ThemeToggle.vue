<template>
  <button class="pr-8 rounded-full" @click="toggleColorMode">
    <span v-if="$colorMode.value === 'dark'" class="text-accent-dark-base"
      >☀️</span
    >
    <span v-else class="text-accent">🌙</span>
  </button>
</template>

<script setup>
import { useColorMode } from "#imports";

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
