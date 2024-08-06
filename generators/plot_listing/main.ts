export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "plot_listing",
    title: {
      "en-US": "Create a Listing for a Plot of Land in Seconds with AI",
      "en-UK": "Create a Listing for a Plot of Land in Seconds with AI",
      es: "Descripción de la Lista de Parcelas",
      de: "Erstellen Sie ein Exposé für ein Grundstück in Sekundenschnelle mit KI",
    },
    image: "plot_listing",
    description: {
      "en-US": "Create a plot listing description that engages and connects with buyers in seconds.",
      "en-UK": "Create a plot listing description that engages and connects with buyers in seconds.",
      es: "Crea una descripción de lista de parcelas que atraiga y conecte con los compradores en segundos.",
      de: "Erstellen Sie ein Exposè für ein Grundstück, die Käufer in Sekunden anspricht und verbindet.",
    },
    credits_per_use: 2,
    cost_per_use: 300,
    promoted: 0,
    contentType: "text",
    interactions: [],
    popularity: 1,
  };
}
