export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_hooks",
    title: {
      "en-US": "Write Convincing Youtube Hooks",
      es: "Escribir ganchos convincentes para Youtube",
      de: "Überzeugende Youtube-Hooks schreiben",
    },
    image: "youtube",
    description: {
      "en-US": "Capture people and entice them to watch your video with engaging Youtube hooks. Get more views and subscribers as a result.",
      es: "Atrae a la gente y sedúcela para que vea tu vídeo con atractivos ganchos de Youtube. Consigue más visitas y suscriptores como resultado.",
      de: "Fesseln Sie Menschen und locken Sie sie mit ansprechenden Youtube-Hooks zum Ansehen Ihres Videos. So erhalten Sie mehr Aufrufe und Abonnenten.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
