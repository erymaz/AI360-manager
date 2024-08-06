export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "amazon_ad_headlines",
    title: {
      "en-US": "Craft Amazon Sponsored Brand Ads Headlines to Drive Traffic",
      es: "Cómo crear titulares de anuncios patrocinados por marcas de Amazon para atraer tráfico",
      de: "Amazon Sponsored Brand Ads Schlagzeilen für mehr Traffic",
    },
    image: "amazon",
    description: {
      "en-US": "Generate Amazon ad headlines to stand out among other products. Include keywords to improve visibility and drive traffic.",
      es: "Genere titulares de anuncios en Amazon para destacar entre otros productos. Incluya palabras clave para mejorar la visibilidad y atraer tráfico.",
      de: "Erstellen Sie Amazon-Anzeigenüberschriften, um sich von anderen Produkten abzuheben. Fügen Sie Schlüsselwörter ein, um die Sichtbarkeit zu verbessern und den Traffic zu erhöhen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
