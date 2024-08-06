export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "home_for_rent",
    title: {
      "en-US": "Create a Welcoming Home for Rent Listing Description",
      es: "Cree una descripción acogedora de su casa de alquiler",
      de: "Erstellen Sie ein Exposé für Ihr Mietobjekt augenblicklich mit KI",
    },
    image: "home_for_rent",
    description: {
      "en-US": "Generate an attention-grabbing listing description for a home for rent with location details and building conditions.",
      es: "Elabore una descripción atractiva de una vivienda en alquiler con detalles sobre su ubicación y las condiciones del edificio.",
      de: "Erstellen Sie ein aufmerksamkeitsstarkes exposé für Mietobjekt mit Angaben zur Lage und zu den baulichen Gegebenheiten.",
    },
    contentType: "text",
    credits_per_use: 3,
    cost_per_use: 300,
    promoted: 0,
    popularity: 1,
  };
}
