export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "analogies",
    title: {
      "en-US": "Analogy Maker",
      es: "Creador de analogías",
      de: "Analogiemacher",
    },
    image: "analogies",
    description: {
      "en-US":
        "Unique analogies that make your sales pitch more memorable and engaging.",
      es: "Analogías únicas que hacen que su argumento de venta sea más memorable y atractivo.",
      "de":
        "Einzigartige Analogien, die Ihr Verkaufsgespräch einprägsamer und ansprechender machen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
