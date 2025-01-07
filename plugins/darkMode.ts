export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState("colorMode", () => "light");

  nuxtApp.hook("app:beforeMount", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    colorMode.value = isDark ? "dark" : "light";
    updateDarkMode(isDark);
  });

  function updateDarkMode(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDark.toString());
  }

  return {
    provide: {
      toggleDarkMode: () => {
        const isDark = colorMode.value === "dark";
        colorMode.value = isDark ? "light" : "dark";
        updateDarkMode(!isDark);
      },
    },
  };
});
