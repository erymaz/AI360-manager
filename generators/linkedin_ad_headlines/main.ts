export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "linkedin_ad_headlines",
    title: {
      "en-US": "Generate LinkedIn Ad Headlines",
      es: "Generar titulares de anuncios en LinkedIn",
      de: "LinkedIn Anzeigen-Schlagzeilen generieren",
    },
    image: "linkedin",
    description: {
      "en-US": "Create ad headlines that instantly attract attention, make users click, and increase shares for your content.",
      es: "Cree titulares de anuncios que atraigan la atención al instante, hagan que los usuarios hagan clic y aumenten las comparticiones de su contenido.",
      de: "Erstellen Sie Anzeigenüberschriften, die sofort Aufmerksamkeit erregen, Nutzer zum Klicken veranlassen und die Verbreitung Ihrer Inhalte erhöhen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
