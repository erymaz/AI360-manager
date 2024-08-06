export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_ideas",
    title: {
      "en-US": "Generate Exciting YouTube Video Ideas at Scale",
      es: "Genere emocionantes ideas para vídeos de YouTube en Scal",
      de: "Spannende YouTube-Video-Ideen bei Scal generieren",
    },
    image: "youtube",
    description: {
      "en-US": "Struggling to come up with new content ideas for your Youtube channel? Generate high-quality Youtube video campaign ideas in seconds using the right keywords.",
      es: "¿Te cuesta encontrar nuevas ideas de contenido para tu canal de Youtube? Genere en segundos ideas de alta calidad para campañas de vídeo en Youtube utilizando las palabras clave adecuadas.",
      de: "Fällt es Ihnen schwer, Ideen für neue Inhalte für Ihren Youtube-Kanal zu finden? Generieren Sie in Sekundenschnelle hochwertige Ideen für Youtube-Videokampagnen, indem Sie die richtigen Schlüsselwörter verwenden.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
