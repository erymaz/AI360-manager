export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "aida",
    title: {
      "en-US": "AIDA Framework",
      es: "Marco AIDA",
      de: "AIDA-Framework",
    },
    image: "aida",
    description: {
      "en-US":
        "Tried and tested formula of Attention, Interest, Desire, Action that is proven to convert.",
      es: "Fórmula probada y comprobada de Atención, Interés, Deseo, Acción que ha demostrado convertir.",
      "de":
        "Bewährte Formel aus Aufmerksamkeit, Interesse, Verlangen und Aktion, die nachweislich umwandelt.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 50,
    promoted: 0,
    popularity: 1,
  };
}
