<template>
  <button
    class="p-2 rounded-full transition-colors duration-200 ease-in-out"
    :aria-label="
      $colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    "
    @click="toggleColorMode"
  >
    <client-only>
      <span v-if="$colorMode.value === 'dark'" class="text-yellow-400">
        <SunIcon class="w-6 h-6 fill-yellow-400" />
      </span>
      <span v-else class="text-white">
        <MoonIcon class="w-6 h-6 fill-accent" />
      </span>
    </client-only>
  </button>
</template>

<script setup>
import { useColorMode } from '#imports'
import { SunIcon, MoonIcon } from "lucide-vue-next";

const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>