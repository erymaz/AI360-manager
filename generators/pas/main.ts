export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "pas",
    title: {
      "en-US": "Pain-Agitate-Solutions",
      es: "Dolor-Agitación-Soluciones",
      de: "Schmerz-Agitieren-Lösungen",
    },
    image: "pas",
    description: {
      "en-US": "The main formula for writing high-converting sales copy.",
      es: "La fórmula principal para escribir una copia de ventas de alta conversión.",
      "de":
        "Die wichtigste Formel zum Verfassen hochkonvertierender Verkaufstexte.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
