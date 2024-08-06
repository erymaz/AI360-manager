export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "content_shorten",
    title: {
      "en-US": "Content Shorten",
      es: "Acortar contenido",
      de: "Inhalt kürzen",
    },
    image: "content_shorten",
    description: {
      "en-US":
        "Short your content in a different voice and style to appeal to different readers.",
      es: "Reduzca su contenido con una voz y estilo diferentes para atraer a diferentes lectores.",
      "de":
        "Kürzen Sie Ihre Inhalte in einer anderen Stimme und einem anderen Stil, um unterschiedliche Leser anzusprechen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
