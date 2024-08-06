export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "amazon_product_titles",
    title: {
      "en-US": "Create Attention-grabbing Amazon Product Titles",
      es: "Crear títulos de productos de Amazon que llamen la atención",
      de: "Erstellen Sie aufmerksamkeitsstarke Amazon Produkttitel",
    },
    image: "amazon",
    description: {
      "en-US": "Generate an Amazon product title that conveys the essence of your product and attracts customer attention among competing products.",
      es: "Genere un título de producto en Amazon que transmita la esencia de su producto y atraiga la atención del cliente entre los productos de la competencia",
      de: "Erstellen Sie einen Amazon-Produkttitel, der die Essenz Ihres Produkts vermittelt und die Aufmerksamkeit der Kunden unter den konkurrierenden Produkten auf sich zieht",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 40,
    promoted: 0,
    popularity: 1,
  };
}
