<template>
  <header class="bg-primary text-background shadow-md">
    <nav
      class="container max-w-3xl mx-auto px-4 py-4 flex justify-between items-center"
    >
      <NuxtLink to="/" class="flex items-center space-x-2">
        <Logo />
      </NuxtLink>
      <div class="flex items-center">
        <ThemeToggle />
        <button @click="toggleMenu" class="ml-4 md:hidden">
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
        <ul class="hidden md:flex space-x-4">
          <li v-for="item in menuItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="hover:text-secondary transition-colors duration-200"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ul v-if="isMenuOpen" class="md:hidden px-4 py-2 space-y-2 bg-primary">
        <li v-for="item in menuItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block py-2 hover:text-secondary transition-colors duration-200"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Menu, X } from "lucide-vue-next";
import Logo from "./Logo.vue";
import ThemeToggle from "./ThemeToggle.vue";

defineOptions({
  name: "SiteHeader",
});

const isMenuOpen = ref(false);

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/feestdagen", label: "Feestdagen" },
  { to: "/schoolvakanties", label: "Schoolvakanties" },
  { to: "/over-ons", label: "Over ons" },
  { to: "/contact", label: "Contact" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
