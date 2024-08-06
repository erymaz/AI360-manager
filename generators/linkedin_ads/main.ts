export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "linkedin_ads",
    title: {
      "en-US": "Create Professional LinkedIn Ads to Attract Leads",
      es: "Crear anuncios profesionales en LinkedIn para atraer clientes potenciales",
      de: "Erstellen Sie professionelle LinkedIn-Anzeigen zur Gewinnung von Leads",
    },
    image: "linkedin",
    description: {
      "en-US": "Generate LinkedIn ads in line with your audience's interests, attract customers and drive traffic to your content or site.",
      es: "Genere anuncios en LinkedIn acordes con los intereses de su audiencia, atraiga clientes y dirija tráfico a su contenido o sitio web.",
      de: "Generieren Sie LinkedIn-Anzeigen, die den Interessen Ihrer Zielgruppe entsprechen, ziehen Sie Kunden an und leiten Sie den Traffic auf Ihre Inhalte oder Ihre Website.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
