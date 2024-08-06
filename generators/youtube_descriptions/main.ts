export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_descriptions",
    title: {
      "en-US": "Create Captivating YouTube Descriptions",
      es: "Crear descripciones cautivadoras para YouTube",
      de: "Fesselnde YouTube-Beschreibungen erstellen",
    },
    image: "youtube",
    description: {
      "en-US": "Instantly generate Youtube descriptions for your videos that convey your story and drive views with the help of the right keywords.",
      es: "Genere instantáneamente descripciones de Youtube para sus vídeos que transmitan su historia y atraigan visitas con la ayuda de las palabras clave adecuadas.",
      de: "Erstellen Sie im Handumdrehen Youtube-Beschreibungen für Ihre Videos, die Ihre Geschichte vermitteln und mit Hilfe der richtigen Schlüsselwörter für mehr Aufrufe sorgen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
