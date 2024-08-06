export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "conclusion_writer",
    title: {
      "en-US": "Conclusion Writer",
      es: "Escritor de conclusiones",
      de: "Fazit-Autor",
    },
    image: "conclusion_writer",
    description: {
      "en-US": "Powerful conclusion copy that will make a reader take action.",
      es: "Texto de conclusión poderoso que hará que el lector actúe.",
      "de":
        "Aussagekräftiger Schlusstext, der den Leser zum Handeln anregt.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
