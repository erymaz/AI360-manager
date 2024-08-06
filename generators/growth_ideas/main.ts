export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "growth_ideas",
    title: {
      "en-US": "Growth Ideas",
      es: "Ideas de crecimiento",
      de: "Wachstumsideen",
    },
    image: "growth_ideas",
    description: {
      "en-US": "High-impact growth tactics to help your business grow.",
      es: "Tácticas de crecimiento de alto impacto para ayudar a que su negocio crezca.",
      "de":
        "Wirkungsvolle Wachstumstaktiken, die Ihrem Unternehmen zum Wachstum verhelfen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
