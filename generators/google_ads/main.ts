export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "google_ads",
    title: {
      "en-US": "Create Compelling Google Ads",
      es: "Crear anuncios convincentes en Google",
      de: "Erstellen Sie überzeugende Google-Anzeigen",
    },
    image: "google",
    description: {
      "en-US": "High-quality Google Ads that highlight product benefits, rank on the search results, and drive clicks and conversions.",
      es: "Anuncios de Google de alta calidad que destaquen las ventajas del producto, se posicionen en los resultados de búsqueda y generen clics y conversiones.",
      de: "Hochwertige Google-Anzeigen, die die Produktvorteile hervorheben, in den Suchergebnissen rangieren und zu Klicks und Konversionen führen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
