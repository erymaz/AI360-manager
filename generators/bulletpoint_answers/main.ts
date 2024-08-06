export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "bulletpoint_answers",
    title: {
      "en-US": "Bullet Point Answers",
      es: "Respuestas de viñetas",
      de: "Bullet-Point-Antworten",
    },
    image: "bulletpoint_answers",
    description: {
      "en-US":
        "Precise and informative bullet points that provide quick and valuable answers to your customers' questions.",
      es: "Viñetas precisas e informativas que brindan respuestas rápidas y valiosas a las preguntas de sus clientes.",
      "de":
        "Präzise und informative Stichpunkte, die schnelle und wertvolle Antworten auf die Fragen Ihrer Kunden liefern.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
