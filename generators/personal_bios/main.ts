export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "personal_bios",
    title: {
      "en-US": "Personal Bios",
      es: "biografías personales",
      de: "Persönliche Biografien",
    },
    image: "personal_bios",
    description: {
      "en-US":
        "Perfect bio copy that shows your expertise and drives more clients to you.",
      es: "Copia de biografía perfecta que muestra su experiencia y atrae a más clientes hacia usted.",
      "de":
        "Perfekte Biografie, die Ihr Fachwissen zeigt und mehr Kunden zu Ihnen bringt.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
