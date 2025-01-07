<template>
  <nav aria-label="breadcrumb" class="mb-4">
    <ol class="flex flex-wrap items-center space-x-2 text-sm text-gray-500">
      <li>
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <span class="mx-2">/</span>
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="hover:text-primary"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span v-else class="text-primary" aria-current="page">
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "NavigationBreadcrumb",
});

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split("/").filter((i) => i);
  return pathArray.map((path, index) => {
    return {
      name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
      path: "/" + pathArray.slice(0, index + 1).join("/"),
    };
  });
});
</script>
