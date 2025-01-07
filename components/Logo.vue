<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="transition-colors duration-300"
    aria-hidden="true"
  >
    <rect
      width="40"
      height="40"
      rx="8"
      fill="currentColor"
      class="text-primary"
    />
    <path
      d="M8 12C8 10.8954 8.89543 10 10 10H30C31.1046 10 32 10.8954 32 12V30C32 31.1046 31.1046 32 30 32H10C8.89543 32 8 31.1046 8 30V12Z"
      stroke="currentColor"
      stroke-width="2"
      class="text-background"
    />
    <rect
      x="12"
      y="16"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      class="text-accent"
    />
    <rect
      x="22"
      y="16"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      class="text-secondary"
    />
    <path
      d="M14 26H26"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      class="text-background"
    />
  </svg>
</template>

<script>
export default {
  name: "SiteLogo",
};
</script>
