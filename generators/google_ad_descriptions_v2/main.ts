export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "google_ad_descriptions_v2",
    title: {
      "en-US": "Generate Google Ad Descriptions V2",
      es: "Descripciones de anuncios de Google V2",
      de: "Google-Anzeigenbeschreibungen generieren V2",
    },
    image: "google",
    description: {
      "en-US": "Create precise Google Ads descriptions that speak to your customers. Include keywords, respond to search intent, and drive clicks and conversions.",
      es: "Cree descripciones precisas de Google Ads que se dirijan a sus clientes. Incluye palabras clave, responde a la intención de búsqueda e impulsa los clics y las conversiones.",
      de: "Erstellen Sie präzise Google Ads-Beschreibungen, die Ihre Kunden ansprechen. Fügen Sie Schlüsselwörter ein, reagieren Sie auf die Suchabsicht und fördern Sie Klicks und Konversionen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
