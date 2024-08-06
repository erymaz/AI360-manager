export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "review_generator",
    title: {
      "en-US": "Review Generator",
      es: "Generador de reseñas",
      de: "Rezensionsgenerator",
    },
    image: "review_generator",
    description: {
      "en-US":
        "Automatically generate personalized high-quality reviews for any product or service.",
      es: "Genera automáticamente reseñas personalizadas de alta calidad para cualquier producto o servicio.",
      "de":
        "Generieren Sie automatisch personalisierte, hochwertige Bewertungen für jedes Produkt oder jede Dienstleistung.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
