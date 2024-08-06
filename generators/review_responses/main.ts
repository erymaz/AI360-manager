export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "review_responses",
    title: {
      "en-US": "Write Personalized Review Responses in a Snap mit AI",
      es: "Respondedor de revisión",
      de: "Schreiben Sie personalisierte Antworten auf Rezensionen augenblicklich mit KI",
    },
    image: "review_responses",
    description: {
      "en-US":
        "Automatically generate personalized replies for both positive and negative reviews.",
      es: "Genera automáticamente respuestas personalizadas para reseñas tanto positivas como negativas.",
      "de":
        "Generieren Sie automatisch personalisierte Antworten sowohl auf positive als auch auf negative Rezensionen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
