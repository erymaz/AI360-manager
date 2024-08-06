export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "amazon_product_descriptions",
    title: {
      "en-US": "Create SEO-friendly Amazon Product Descriptions in Seconds",
      es: "Crear descripciones de productos de Amazon SEO-friendly en segundos",
      de: "Erstellen Sie in Sekundenschnelle SEO-freundliche Amazon-Produktbeschreibungen",
    },
    image: "amazon",
    description: {
      "en-US": "Create a detailed description for an Amazon product that outlines the product benefits, and problems it solves including all the right keywords. Take your products to the first page of search results.",
      es: "Cree una descripción detallada para un producto de Amazon que describa los beneficios del producto y los problemas que resuelve, incluyendo todas las palabras clave adecuadas. Lleva tus productos a la primera página de los resultados de búsqueda.",
      de: "Erstellen Sie eine detaillierte Beschreibung für ein Amazon-Produkt, die die Produktvorteile und die Probleme, die es löst, umreißt und alle richtigen Schlüsselwörter enthält. Bringen Sie Ihre Produkte auf die erste Seite der Suchergebnisse.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 90,
    promoted: 0,
    popularity: 1,
  };
}
