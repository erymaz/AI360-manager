export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "active_voice",
    title: {
      "en-US": "Passive to Active Voice",
      es: "Voz pasiva a activa",
      de: "Passive bis aktive Stimme",
    },
    image: "active_voice",
    description: {
      "en-US":
        "Easy and quick solution to converting your passive voice sentences into active voice sentences.",
      es: "Solución fácil y rápida para convertir sus oraciones de voz pasiva en oraciones de voz activa.",
      "de":
        "Einfache und schnelle Lösung zur Umwandlung Ihrer Passivsätze in Aktivsätze.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 50,
    promoted: 0,
    popularity: 3,
  };
}
