export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_outlines",
    title: {
      "en-US": "Get a YouTube Video Outline in Seconds",
      es: "Obtén un esquema de vídeo de YouTube en segundos",
      de: "YouTube-Video-Gliederung in Sekundenschnelle erstellen",
    },
    image: "youtube",
    description: {
      "en-US": "Create step-by-step video outlines that convey your story from start to finish. Drive viewers and subscriptions with a captivating story.",
      es: "Cree esquemas de vídeo paso a paso que transmitan su historia de principio a fin. Atraiga espectadores y suscriptores con una historia cautivadora.",
      de: "Erstellen Sie Schritt-für-Schritt-Videogliederungen, die Ihre Geschichte von Anfang bis Ende vermitteln. Werben Sie mit einer fesselnden Geschichte Zuschauer und Abonnenten an.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
