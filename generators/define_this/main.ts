export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "define_this",
    title: {
      "en-US": "Definition",
      es: "Definición",
      de: "Definition",
    },
    image: "define_this",
    description: {
      "en-US":
        "A definition for a word, phrase, or acronym that's used often by your target buyers.",
      es: "Una definición de una palabra, frase o acrónimo que los compradores objetivo utilizan con frecuencia.",
      "de":
        "Eine Definition für ein Wort, eine Phrase oder ein Akronym, das von Ihren Zielkäufern häufig verwendet wird.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
