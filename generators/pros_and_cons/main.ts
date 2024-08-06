export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "pros_and_cons",
    title: {
      "en-US": "Outline Product's Benefits and Problems It Solves in One Simple Text",
      es: "Resuma las ventajas del producto y los problemas que resuelve en un texto sencillo",
      de: "Skizzieren Sie die Vorteile des Produkts und die Probleme, die es löst, in einem einfachen Text",
    },
    image: "pros_and_cons",
    description: {
      "en-US": "Describe the product's benefits and problems it solves in a coherent copy. Give customers a clear reason to buy that resonates with their needs.",
      es: "Describir las ventajas del producto y los problemas que resuelve en un texto coherente. Ofrezca a los clientes una razón clara para comprar que resuene con sus necesidades..",
      de: "Beschreiben Sie die Vorteile des Produkts und die Probleme, die es löst, in einem kohärenten Text. Geben Sie den Kunden einen klaren Kaufgrund, der auf ihre Bedürfnisse abgestimmt ist.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
