export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "feature_to_benefits",
    title: {
      "en-US": "Feature to Benefit",
      es: "Característica a Beneficiar",
      de: "Funktion zum Nutzen",
    },
    image: "feature_to_benefits",
    description: {
      "en-US":
        "Unique content that focuses on features to emphasize benefits of your product or service.",
      es: "Contenido único que se enfoca en características para enfatizar los beneficios de su producto o servicio.",
      "de":
        "Einzigartiger Inhalt, der sich auf Funktionen konzentriert, um die Vorteile Ihres Produkts oder Ihrer Dienstleistung hervorzuheben.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
