export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "subject_lines",
    title: {
      "en-US": "Email Subject Lines",
      es: "Líneas de asunto del correo electrónico",
      de: "E-Mail-Betreffzeilen",
    },
    image: "subject_lines",
    description: {
      "en-US": "Powerful email subject lines that increase open rates",
      es: "Potentes líneas de asunto de correo electrónico que aumentan las tasas de apertura",
      "de":
        "Leistungsstarke E-Mail-Betreffzeilen, die die Öffnungsraten erhöhen",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
