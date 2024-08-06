export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "blog_outlines",
    title: {
      "en-US": "Step-by-step AI Article Outlines",
      es: "Esquemas de artículos sobre IA paso a paso",
      de: "Schritt-für-Schritt KI-Artikelumrisse",
    },
    image: "blog",
    description: {
      "en-US":
        "Create an article outline in seconds for informative and engaging content that converts leads into loyal customers.",
      es: "Cree un esquema de artículo en segundos para obtener contenidos informativos y atractivos que conviertan clientes potenciales en clientes fieles.",
      de:
        "Erstellen Sie in Sekundenschnelle einen Artikelentwurf für informative und ansprechende Inhalte, die Leads in treue Kunden verwandeln.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
