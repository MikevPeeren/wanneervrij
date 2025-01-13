<template>
  <nav aria-label="Breadcrumb" class="text-sm mb-4">
    <ol class="list-none p-0 inline-flex">
      <li class="flex items-center">
        <BaseLink to="/">Home</BaseLink>
      </li>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <span class="mx-2 text-gray-400 dark:text-gray-500">/</span>
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span
          v-else
          class="text-gray-700 dark:text-gray-200 font-semibold"
          aria-current="page"
        >
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

defineOptions({
  name: "BreadCrumb",
});

const breadcrumbs = computed(() => {
  const path = route.path;
  const parts = path.split("/").filter((part) => part);

  return parts.map((part, index) => {
    const url = "/" + parts.slice(0, index + 1).join("/");
    return {
      name: part.charAt(0).toUpperCase() + part.slice(1),
      path: url,
    };
  });
});
</script>
