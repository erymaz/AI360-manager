export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "rewrite_with_keywords",
    title: {
      "en-US": "Rewrite With Keywords",
      es: "Reescribir con palabras clave",
      de: "Mit Schlüsselwörtern umschreiben",
    },
    image: "rewrite_with_keywords",
    description: {
      "en-US":
        "Rewrite your existing content to include more keywords and boost your search engine rankings.",
      es: "Reescriba su contenido existente para incluir más palabras clave y mejorar su clasificación en los motores de búsqueda.",
      "de":
        "Schreiben Sie Ihre vorhandenen Inhalte neu, um mehr Schlüsselwörter einzubeziehen und Ihr Suchmaschinenranking zu verbessern.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
