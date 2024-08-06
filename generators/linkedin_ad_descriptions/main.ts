export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "linkedin_ad_descriptions",
    title: {
      "en-US": "Generate LinkedIn Ad Descriptions",
      es: "Generar descripciones de anuncios de LinkedIn",
      de: "LinkedIn Anzeigenbeschreibungen generieren",
    },
    image: "linkedin",
    description: {
      "en-US": "Create professional ads on LinkedIn to attract customers' attention and boost traffic to your content or site.",
      es: "Cree anuncios profesionales en LinkedIn para atraer la atención de los clientes y aumentar el tráfico a su contenido o sitio web.",
      de: "Erstellen Sie professionelle Anzeigen auf LinkedIn, um die Aufmerksamkeit von Kunden zu erregen und den Traffic auf Ihre Inhalte oder Website zu erhöhen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
