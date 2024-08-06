export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "google_ad_descriptions",
    title: {
      "en-US": "Generate High-converting Google Ad Descriptions in Seconds",
      es: "Generar descripciones de anuncios de Google",
      de: "Generieren Sie in Sekundenschnelle hochkonvertierende Google-Anzeigenbeschreibungen",
    },
    image: "google_ad_descriptions",
    description: {
      "en-US": "Create precise Google Ads descriptions that speak to your customers. Include keywords, respond to search intent, and drive clicks and conversions.",
      es: "Cree descripciones precisas de Google Ads que se dirijan a sus clientes. Incluye palabras clave, responde a la intención de búsqueda e impulsa los clics y las conversiones.",
      de: "Erstellen Sie präzise Google Ads-Beschreibungen, die Ihre Kunden ansprechen. Enthalten Sie Schlüsselwörter, reagieren Sie auf die Suchabsicht und fördern Sie Klicks und Konversionen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
