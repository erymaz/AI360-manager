export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "quora_answers",
    title: {
      "en-US": "Quora Answers",
      es: "Respuestas de Quora",
      de: "Quora-Antworten",
    },
    image: "quora_answers",
    description: {
      "en-US":
        "Answers to Quora questions that will position you as an authority.",
      es: "Respuestas a las preguntas de Quora que te posicionarán como una autoridad.",
      "de":
        "Antworten auf Quora-Fragen, die Sie als Autorität positionieren.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
