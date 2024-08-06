export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "question_generation",
    title: {
      "en-US": "Questions",
      es: "Preguntas",
      de: "Fragen",
    },
    image: "question_generation",
    description: {
      "en-US":
        "A tool to create engaging questions and polls that increase audience participation and engagement.",
      es: "Una herramienta para crear preguntas y encuestas atractivas que aumentan la participación y el compromiso de la audiencia.",
      "de":
        "Ein Tool zum Erstellen ansprechender Fragen und Umfragen, die die Beteiligung und das Engagement des Publikums erhöhen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
