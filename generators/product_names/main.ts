export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "product_names",
    title: {
      "en-US": "Generate a Product Name that Encapsulates Your Product or Service",
      es: "Genere un nombre de producto que encapsule su producto o servicio",
      de: "Entwickeln Sie einen Produktnamen, der Ihr Produkt oder Ihre Dienstleistung auf den Punkt bringt.",
    },
    image: "product_names",
    description: {
      "en-US": "Catchy and meaningful names for your products. Express what your product is about in a short and compelling name.",
      es: "Nombres pegadizos y significativos para sus productos. Exprese de qué trata su producto con un nombre breve y convincente.",
      de: "Einprägsame und aussagekräftige Namen für Ihre Produkte. Drücken Sie in einem kurzen und aussagekräftigen Namen aus, worum es bei Ihrem Produkt geht.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
