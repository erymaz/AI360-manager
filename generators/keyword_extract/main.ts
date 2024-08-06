export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "keyword_extract",
    title: {
      "en-US": "Keyword Extractor (English Only)",
      es: "Extractor de palabras clave (solo en inglés)",
      de: "Keyword-Extraktor (nur Englisch)",
    },
    image: "keyword_extract",
    description: {
      "en-US":
        "Keywords extracted from content that you can use for your optimization, SEO, or content creation purposes.",
      es: "Palabras clave extraídas del contenido que puede usar para su optimización, SEO o creación de contenido.",
      "de":
        "Aus Inhalten extrahierte Schlüsselwörter, die Sie für Ihre Optimierungs-, SEO- oder Inhaltserstellungszwecke verwenden können.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
