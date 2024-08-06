export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "linkedin_posts_v2",
    title: {
      "en-US": "Create Professional and Engaging LinkedIn Posts in Seconds",
      es: "Crear mensajes profesionales breves en LinkedIn V2",
      de: "Erstellen Sie in Sekundenschnelle professionelle und engagierte LinkedIn Beiträge",
    },
    image: "linkedin",
    description: {
      "en-US": "Write detailed LinkedIn posts with all the right details, emojis, and hashtags to give updates on your company or personal page and inspire your audience.",
      es: "Publicaciones detalladas en LinkedIn con todos los detalles, emojis y hashtags adecuados para ofrecer actualizaciones sobre tu empresa o página personal e inspirar a tu audiencia.",
      de: "Erstellen Sie detaillierte und profesionelle LinkedIn-Posts mit den richtigen Details, Emojis, Hashtags... um Ihr Unternehmen auf den neuesten Stand zu bringen und Ihr Publikum zu inspirieren.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 50,
    promoted: 0,
    popularity: 1,
  };
}
