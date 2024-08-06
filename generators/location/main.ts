export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "location",
    title: {
      "en-US": "Create a location description in seconds with AI",
      "en-UK": "Create a location description in seconds with AI",
      es: "Descripción de la Ubicación",
      de: "Erstellen Sie eine Lagebeschreibung in Sekundenschnelle mit KI",
    },
    description: {
      "en-US":
        "Generate a customized location description for your Real Estate Property, your rental apartment, your office business. Supported by the best and most accurate location information sources on the web.",
      "en-UK":
        "Generate a customized location description for your Real Estate Property, your rental apartment, your office business. Supported by the best and most accurate location information sources on the web.",
      es: "Genere una descripción de ubicación personalizada para su propiedad inmobiliaria, su piso de alquiler, su negocio de oficinas. Con el apoyo de las mejores y más precisas fuentes de información de localización en la web.",
      "de":
        "Erstellen Sie eine individuelle Standortbeschreibung für Ihre Immobilie, Ihre Mietwohnung, Ihr Bürounternehmen. Unterstützt durch die besten und genaueren Standortinformationsquellen im Internet.",
    },
    image: "location",
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
