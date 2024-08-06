export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "google_ad_titles",
    title: {
      "en-US": "Create Google Ad Titles to for Your Selected Keywords with Ease",
      es: "Crear títulos de anuncios de Google con palabras clave",
      de: "Erstellen Sie einfach Google-Anzeigentitel für Ihre ausgewählten Schlüsselwörter",
    },
    image: "google",
    description: {
      "en-US": "Generate Google Ad Titles with the right keywords and targeted to your audience for more clicks and conversions.",
      es: "Genere Google Ad Titles con las palabras clave adecuadas y dirigidas a su público para obtener más clics y conversiones.",
      de: "Erstellen Sie Google-Anzeigentitel mit den richtigen Schlüsselwörtern, die auf Ihre Zielgruppe zugeschnitten sind, um mehr Klicks und Konversionen zu erzielen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
