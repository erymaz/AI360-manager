export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "prefab_houses",
    title: {
      "en-US": "Create a Prefab Home Description including Materials, Plan options, and Building Conditions",
      es: "Cree una descripción de la casa prefabricada que incluya materiales, opciones de planos y condiciones de construcción",
      de: "Erstellen Sie ein Exposé für ein Fertighaus inklusive Materialen, Planoptionen & Baubedingungen",
    },
    image: "prefab_houses",
    description: {
      "en-US": "Attracts buyers with high-quality Prefab Home Description. Include materials, plan options, and building conditions for a high-quality listing that makes customers inquire more.",
      es: "Atrae a los compradores con casas prefabricadas de alta calidad Descripción. Incluya materiales, opciones de planos y condiciones de construcción para obtener un listado de alta calidad que haga que los clientes pregunten más.",
      de: "Zieht Käufer mit hochwertigen Fertighäusern an Beschreibung. Geben Sie Materialien, Planungsoptionen und Baubedingungen an, um ein qualitativ hochwertiges Angebot zu erstellen, das Kunden zu weiteren Nachfragen veranlasst.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 300,
    promoted: 0,
    popularity: 1,
  };
}
