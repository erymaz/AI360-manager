export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "blog_ideas",
    title: {
      "en-US": "Generate Engaging AI Article Ideas in Seconds",
      es: "Genere ideas atractivas para artículos de IA en segundos",
      de: "Generieren Sie in Sekundenschnelle ansprechende AI-Artikel-Ideen",
    },
    image: "blog",
    description: {
      "en-US": "Get a few article/blog ideas to create informative and engaging content that drives traffic and moves leads down the sales funnel.",
      es: "Obtenga algunas ideas de artículos/blogs para crear contenido informativo y atractivo que impulse el tráfico y haga avanzar a los clientes potenciales por el embudo de ventas.",
      de: "Holen Sie sich ein paar Ideen für Artikel/Blogs, um informative und ansprechende Inhalte zu erstellen, die den Verkehr ankurbeln und Leads in den Verkaufstrichter bringen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
