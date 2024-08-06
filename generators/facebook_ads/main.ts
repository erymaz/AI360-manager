export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "facebook_ads",
    title: {
      "en-US": "Generate Facebook Ads at Scale",
      es: "Generar anuncios de Facebook a escala",
      de: "Facebook-Werbeanzeigen in großem Umfang generieren",
    },
    image: "facebook",
    description: {
      "en-US": "Create attention-grabbing Facebook ad copies at scale. Specify an event, occasion, or promotion and take the Facebook audience by storm.",
      es: "Crea anuncios llamativos en Facebook a gran escala. Especifica un evento, una ocasión o una promoción y arrasa entre el público de Facebook.",
      de: "Erstellen Sie aufmerksamkeitsstarke Facebook-Werbetexte in großem Umfang. Geben Sie ein Ereignis, einen Anlass oder eine Aktion an und erobern Sie die Facebook-Zielgruppe im Sturm.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
