export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "lyrics_generator",
    title: {
      "en-US": "Song Lyrics",
      es: "Letras de canciones",
      de: "Liedtext",
    },
    image: "lyrics_generator",
    description: {
      "en-US":
        "Unique song lyrics that will be perfect for your next hit song.",
      es: "Letras de canciones únicas que serán perfectas para tu próxima canción exitosa.",
      "de":
        "Einzigartige Songtexte, die perfekt zu Ihrem nächsten Hit passen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
