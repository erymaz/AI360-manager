export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "meta_home",
    title: {
      "en-US": "SEO Meta Tags (Homepage)",
      es: "Metaetiquetas SEO (página de inicio)",
      de: "SEO-Meta-Tags (Homepage)",
    },
    image: "meta_home",
    description: {
      "en-US":
        "A set of optimized meta title and meta description tags that will boost your search rankings for your home page.",
      es: "Un conjunto de metatítulos optimizados y etiquetas de metadescripción que impulsarán su clasificación de búsqueda para su página de inicio.",
      "de":
        "Eine Reihe optimierter Meta-Titel- und Meta-Beschreibungs-Tags, die Ihr Suchranking für Ihre Homepage verbessern.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
