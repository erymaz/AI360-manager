export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "content_rephrase",
    title: {
      "en-US": "Content Rephrase",
      es: "Reformulación de contenido",
      de: "Neuformulierung des Inhalts",
    },
    image: "content_rephrase",
    description: {
      "en-US":
        "Rephrase your content in a different voice and style to appeal to different readers.",
      es: "Reformule su contenido con una voz y estilo diferentes para atraer a diferentes lectores.",
      "de":
        "Formulieren Sie Ihre Inhalte mit einer anderen Stimme und einem anderen Stil neu, um unterschiedliche Leser anzusprechen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
