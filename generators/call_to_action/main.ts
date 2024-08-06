export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "call_to_action",
    title: {
      "en-US": "Call to Action",
      es: "Llamada a la acción",
      de: "Aufruf zum Handeln",
    },
    image: "call_to_action",
    description: {
      "en-US":
        "Eye-catching calls to action that will encourage conversions and boost your sales.",
      es: "Llamadas a la acción llamativas que fomentarán las conversiones y aumentarán sus ventas.",
      "de":
        "Auffällige Handlungsaufforderungen, die zu Conversions anregen und Ihren Umsatz steigern.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
