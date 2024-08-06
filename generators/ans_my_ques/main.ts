export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "ans_my_ques",
    title: {
      "en-US": "Answers Generator",
      es: "Generador de respuestas",
      de: "Generator für Antworten",
    },
    image: "ans_my_ques",
    description: {
      "en-US": "Get answers to any question in seconds.",
      es: "Obtenga respuestas a cualquier pregunta en cuestión de segundos.",
      de: "Sie erhalten in Sekundenschnelle Antworten auf jede Frage.n",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
