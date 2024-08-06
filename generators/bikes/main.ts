export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "bikes",
    title: {
      "en-US": "Create Detailed Bike Product Descriptions",
      "en-UK": "Create Detailed Bike Product Descriptions",
      es: "Crear descripciones detalladas de productos para bicicletas",
      de: "Detaillierte Produktbeschreibungen für Fahrräder erstellen",
    },
    image: "bikes",
    description: {
      "en-US":
        "Generate a high-quality bike description that includes all technical details and create a story that highlights your passion for this beautiful sport.",
      "en-UK":
        "Generate a high-quality bike description that includes all technical details and create a story that highlights your passion for this beautiful sport.",
      es: "Genera una descripción de la moto de alta calidad que incluya todos los detalles técnicos y crea una historia que destaque tu pasión por este hermoso deporte.",
      "de":
        "Erstellen Sie eine hochwertige Fahrradbeschreibung, die alle technischen Details und Geschichten enthält, die Ihre Leidenschaft für diesen schönen Sport unterstreichen.",
    },
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    contentType: "text",
    interactions: [],
    tags: ["cycling"],
  };
}
