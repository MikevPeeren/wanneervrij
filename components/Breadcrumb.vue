<template>
  <nav aria-label="BreadcrumbNav" class="mb-4">
    <ol class="flex flex-wrap items-center space-x-2 text-sm">
      <li>
        <NuxtLink
          to="/"
          class="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent dark:text-accent-light dark:focus:ring-accent-light"
          :aria-current="$route.path === '/' ? 'page' : undefined"
        >
          Home
        </NuxtLink>
      </li>
      <li v-if="$route.path !== '/'">
        <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <template v-if="index < breadcrumbs.length - 1">
          <NuxtLink
            :to="crumb.path"
            class="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent dark:text-accent-light dark:focus:ring-accent-light"
          >
            {{ crumb.name }}
          </NuxtLink>
          <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
        </template>
        <span
          v-else
          class="text-gray-600 dark:text-gray-400"
          aria-current="page"
        >
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

defineOptions({
  name: "BreadCrumb",
});

const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter(part => part)
  
  return parts.map((part, index) => {
    const url = '/' + parts.slice(0, index + 1).join('/')
    return {
      name: part.charAt(0).toUpperCase() + part.slice(1),
      path: url
    }
  })
})
</script>