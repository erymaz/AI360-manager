export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "summary",
    title: {
      "en-US": "Text Summary",
      es: "Resumen de texto",
      de: "Textzusammenfassung",
    },
    image: "summary",
    description: {
      "en-US":
        "Shortened text copy that provides the main ideas and most important details of your original text.",
      es: "Copia de texto abreviado que proporciona las ideas principales y los detalles más importantes de su texto original.",
      "de":
        "Gekürzte Textkopie, die die Hauptgedanken und wichtigsten Details Ihres Originaltextes enthält.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
