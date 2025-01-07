<template>
  <div class="max-w-2xl text-text">
    <Breadcrumb />

    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-primary">Over Ons</h1>

    <div class="mb-8 space-y-6">
      <section>
        <p class="mb-4">
          Of je nu een vakantie plant, een lang weekend wilt organiseren of
          gewoon wilt weten wanneer je kinderen vrij zijn van school, Weekend
          Vrij biedt je de informatie die je nodig hebt.
        </p>
      </section>

      <section>
        <h2 class="text-1xl md:text-2xl font-semibold mb-4 text-primary">
          Onze Missie
        </h2>
        <p class="mb-4">
          Wanneer Vrij is opgericht met één doel voor ogen: het vereenvoudigen
          van vakantie- en vrijetijdsplanning voor alle Nederlanders. We geloven
          dat iedereen recht heeft op ontspanning en quality time, en onze
          missie is om dat zo toegankelijk mogelijk te maken.
        </p>
        <p>
          Door een overzichtelijke en up-to-date kalender te bieden van alle
          nationale feestdagen en schoolvakanties, helpen we gezinnen,
          werknemers en werkgevers om hun tijd effectief in te delen en optimaal
          te genieten van hun vrije dagen.
        </p>
      </section>

      <section>
        <h2 class="text-1xl md:text-2xl font-semibold mb-4 text-primary">
          Wat We Bieden
        </h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>Actuele informatie over Nederlandse feestdagen</li>
          <li>Overzicht van schoolvakanties per regio</li>
          <li>Handige planningstools voor lange weekenden en vakanties</li>
          <li>Tips voor het optimaal benutten van je vrije tijd</li>
          <li>
            Regelmatige updates over speciale evenementen en festiviteiten
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title:
    "Over Ons - Wanneer Vrij | Jouw Bron voor Nederlandse Vakanties en Feestdagen",
  meta: [
    {
      name: "description",
      content:
        "Ontdek het verhaal achter Wanneer Vrij, jouw betrouwbare bron voor informatie over Nederlandse feestdagen en schoolvakanties. Leer over onze missie, ons team en hoe we jou helpen je vrije tijd optimaal te plannen.",
    },
    {
      name: "keywords",
      content:
        "Wanneer Vrij, Nederlandse feestdagen, schoolvakanties, vrijetijdsplanning, vakantiekalender",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://wanneervrij.nl/over-ons",
    },
  ],
});

// Structured data voor de Over Ons pagina
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Over Wanneer Vrij",
  description:
    "Informatie over Wanneer Vrij, jouw bron voor Nederlandse feestdagen en schoolvakanties",
  url: "https://wanneervrij.nl/over-ons",
  mainEntity: {
    "@type": "Organization",
    name: "Wanneer Vrij",
    url: "https://wanneervrij.nl",
    description:
      "Wanneer Vrij is de betrouwbare bron voor informatie over Nederlandse feestdagen en schoolvakanties, die mensen helpt bij het plannen van hun vrije tijd.",
  },
};

useHead({
  script: [
    { innerHTML: JSON.stringify(structuredData), type: "application/ld+json" },
  ],
});
</script>
