export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "paragraph_writer",
    title: {
      "en-US": "Paragraph Writer",
      es: "Escritor de párrafo",
      de: "Absatzschreiber",
    },
    image: "paragraph_writer",
    description: {
      "en-US":
        "Perfectly structured paragraphs that are easy to read and packed with persuasive words.",
      es: "Párrafos perfectamente estructurados que son fáciles de leer y llenos de palabras persuasivas.",
      "de":
        "Perfekt strukturierte Absätze, die leicht zu lesen sind und voller überzeugender Worte.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
