export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_descriptions_v2",
    title: {
      "en-US": "Generate YouTube Descriptions that boost your SEO and conversion",
      es: "Descripciones de YouTube V2",
      de: "Generieren Sie YouTube-Beschreibungen, die Ihre SEO und Konversion steigern",
    },
    image: "youtube",
    description: {
      "en-US": "Convey the essence of your video with engaging Youtube descriptions that can be generated in seconds.",
      es: "Transmita la esencia de su vídeo con atractivas descripciones de Youtube que pueden generarse en segundos.",
      de: "Vermitteln Sie die Essenz Ihres Videos mit ansprechenden Youtube-Beschreibungen, die in Sekundenschnelle erstellt werden können.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
