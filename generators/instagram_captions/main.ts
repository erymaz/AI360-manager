export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "instagram_captions",
    title: {
      "en-US": "Generate Instagram Captions in Seconds",
      es: "Generar pies de foto de Instagram en segundos",
      de: "Instagram-Untertitel in Sekundenschnelle generieren",
    },
    image: "instagram",
    description: {
      "en-US":
        "Express ideas in your Instagram post to attract attention and comments. Tell a story, invite a conversation, highlight your product's benefits, and promote.",
      es: "Expresa ideas en tu post de Instagram para atraer la atención y los comentarios. Cuenta una historia, invita a una conversación, destaca las ventajas de tu producto y promociónalo.",
      de:
        "Drücken Sie in Ihrem Instagram-Post Ideen aus, um Aufmerksamkeit und Kommentare zu erregen. Erzählen Sie eine Geschichte, laden Sie zu einem Gespräch ein, heben Sie die Vorteile Ihres Produkts hervor und machen Sie Werbung.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
