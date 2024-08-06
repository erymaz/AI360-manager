export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "meta_prod",
    title: {
      "en-US": "SEO Meta Tags (Product Page)",
      es: "Metaetiquetas SEO (página del producto)",
      de: "SEO-Meta-Tags (Produktseite)",
    },
    image: "meta_prod",
    description: {
      "en-US":
        "A set of optimized meta title and meta description tags that will boost your search rankings for your product page.",
      es: "Un conjunto de etiquetas optimizadas de metatítulo y metadescripción que impulsarán su clasificación de búsqueda para la página de su producto.",
      "de":
        "Eine Reihe optimierter Meta-Titel- und Meta-Beschreibungs-Tags, die Ihr Suchranking für Ihre Produktseite verbessern.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
