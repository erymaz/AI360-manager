export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "women_clothing",
    title: {
      "en-US": "Compile Attractive Women's Clothing Product Descriptions",
      es: "Recopilar descripciones atractivas de productos de ropa de mujer",
      de: "Attraktive Produktbeschreibungen für Damenbekleidung zusammenstellen",
    },
    image: "women_clothing",
    description: {
      "en-US": "Create a women's clothing description that sells. Solve the problem of time-consuming and labor-intensive writing by generating accurate women's clothing descriptions in seconds.",
      es: "Cree una descripción de ropa de mujer que venda. Resuelva el problema de la redacción laboriosa y lenta generando descripciones precisas de ropa de mujer en cuestión de segundos.",
      de: "Erstellen Sie eine Beschreibung für Damenbekleidung, die sich verkauft. Lösen Sie das Problem des zeitaufwändigen und arbeitsintensiven Schreibens, indem Sie in Sekundenschnelle präzise Beschreibungen für Damenbekleidung erstellen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
