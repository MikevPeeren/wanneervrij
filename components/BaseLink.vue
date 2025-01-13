<template>
  <NuxtLink
    :to="to"
    :class="[
      'transition-colors duration-200',
      'text-accent-dark hover:text-accent-darker focus:text-accent-darker',
      'dark:text-accent-dark-base dark:hover:text-accent-dark-high dark:focus:text-accent-dark-high',
      'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-accent-dark-base dark:focus:ring-offset-gray-900',
      'underline underline-offset-2 decoration-1 hover:decoration-2',
    ]"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
