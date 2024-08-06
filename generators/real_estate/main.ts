export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "real_estate",
    title: {
      "en-US": "Create a Real Estate Listing in Seconds Using AI",
      "en-UK": "Create a Real Estate Listing in Seconds Using AI",
      es: "Crear un anuncio inmobiliario en segundos con IA",
      de: "Erstellen Sie ein Immobilienexposé in Sekundenschnelle mit KI",
    },
    image: "for-sale",
    description: {
      "en-US": "A Real Estate listing description that engages and connects with buyers. Use all the data from the seller to create an accurate description in seconds.",
      "en-UK": "Create a listing description that engages and connects with buyers. Use all the data from the seller to create an accurate description in seconds.",
      es: "Una descripción de anuncio inmobiliario que atraiga y conecte con los compradores.. Utiliza todos los datos del vendedor para crear una descripción precisa en segundos.",
      de: "Eine Beschreibung des Immobilienangebots, die Käufer anspricht und mit ihnen in Verbindung steht. Verwenden Sie alle Daten des Verkäufers, um in Sekundenschnelle eine genaue Beschreibung zu erstellen.",
    },
    contentType: "text",
    credits_per_use: 4,
    cost_per_use: 300,
    promoted: 0,
    popularity: 1,
  };
}
