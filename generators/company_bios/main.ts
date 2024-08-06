export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "company_bios",
    title: {
      "en-US": "Company Bios",
      es: "biografías de la empresa",
      de: "Firmenbiografien",
    },
    image: "company_bios",
    description: {
      "en-US":
        "Short and sweet company bio that will help you connect with your target audience.",
      es: "Biografía breve y agradable de la empresa que lo ayudará a conectarse con su público objetivo.",
      "de":
        "Kurze und prägnante Unternehmensbiografie, die Ihnen hilft, mit Ihrer Zielgruppe in Kontakt zu treten.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
