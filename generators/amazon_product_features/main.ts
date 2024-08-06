export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "amazon_product_features",
    title: {
      "en-US": "Highlight Product's Advantages and Features with Amazon Product Features Description",
      es: "Destaca las ventajas y características del producto con la descripción de características del producto de Amazon",
      de: "Hervorhebung der Produktvorteile und -merkmale mit Amazon Product Features Description",
    },
    image: "amazon",
    description: {
      "en-US": "Outline advantages and features of your product in a customer-focused product features description. Showcase your product's benefits to Amazon users.",
      es: "Destaca las ventajas y características de tu producto en una descripción centrada en el cliente. Muestra las ventajas de tu producto a los usuarios de Amazon.",
      de: "Stellen Sie die Vorteile und Merkmale Ihres Produkts in einer kundenorientierten Beschreibung der Produktmerkmale dar. Stellen Sie die Vorteile Ihres Produkts für Amazon-Nutzer heraus.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 70,
    promoted: 0,
    popularity: 1,
  };
}
