export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "meta_blog",
    title: {
      "en-US": "SEO Meta Tags (Blog Post)",
      es: "Metaetiquetas de SEO (entrada de blog)",
      de: "SEO-Meta-Tags (Blogbeitrag)",
    },
    image: "meta_blog",
    description: {
      "en-US":
        "A set of optimized meta title and meta description tags that will boost your search rankings for your blog.",
      es: "Un conjunto de metatítulos optimizados y etiquetas de metadescripción que impulsarán las clasificaciones de búsqueda de tu blog.",
      "de":
        "Eine Reihe optimierter Meta-Titel- und Meta-Beschreibungs-Tags, die Ihr Suchranking für Ihr Blog verbessern.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
