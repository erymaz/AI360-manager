export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "linkedin_posts",
    title: {
      "en-US": "Create Short Professional LinkedIn Posts",
      es: "Crear mensajes profesionales breves en LinkedIn",
      de: "Erstellen Sie kurze professionelle LinkedIn Beiträge",
    },
    image: "linkedin",
    description: {
      "en-US": "Write engaging LinkedIn posts with hashtags and emojis for maximum impact. Spark conversation on LinkedIn with professional authority content.",
      es: "Escribe publicaciones atractivas en LinkedIn con hashtags y emojis para lograr el máximo impacto. Enciende la conversación en LinkedIn con contenido profesional de autoridad..",
      de: "Schreiben Sie ansprechende LinkedIn-Posts mit Hashtags und Emojis für maximale Wirkung. Fördern Sie die Konversation auf LinkedIn mit professionellen, kompetenten Inhalten..",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
