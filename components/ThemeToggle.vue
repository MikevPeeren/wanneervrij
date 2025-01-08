<template>
  <button
    class="p-2 rounded-full transition-colors duration-200 ease-in-out"
    :aria-label="
      colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    "
    @click="toggleColorMode"
  >
    <client-only>
      <span v-if="colorMode === 'dark'" class="text-yellow-400">
        <SunIcon class="w-6 h-6 fill-yellow-400" />
      </span>
      <span v-else class="text-white">
        <MoonIcon class="w-6 h-6 fill-accent" />
      </span>
    </client-only>
  </button>
</template>

<script setup>
import { onMounted } from "vue";
import { useColorMode } from "@vueuse/core";
import { SunIcon, MoonIcon } from "lucide-vue-next";

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
  updateDocumentClass();
};

const updateDocumentClass = () => {
  if (colorMode.value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  updateDocumentClass();
});
</script>
