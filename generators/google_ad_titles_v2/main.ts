export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "google_ad_titles_v2",
    title: {
      "en-US": "Generate Google Ad Titles with Keywords V2",
      es: "Crear títulos de anuncios de Google con palabras clave V2",
      de: "Google-Anzeigentitel mit Schlüsselwörtern erstellen V2",
    },
    image: "google",
    description: {
      "en-US": "Create unique Google Ads titles that correspond to the search intent and drive traffic to your site.",
      es: "Cree títulos de anuncios de Google únicos que se correspondan con la intención de búsqueda y dirijan el tráfico a su sitio.",
      de: "Erstellen Sie einzigartige Google-Anzeigentitel, die der Suchabsicht entsprechen und den Traffic auf Ihre Website lenken.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
