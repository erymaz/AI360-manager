export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_titles",
    title: {
      "en-US": "Generate YouTube Titles that Drive Views",
      es: "Crear títulos de YouTube que atraigan visitas",
      de: "Generieren Sie YouTube-Titel, die für mehr Aufrufe sorgen",
    },
    image: "youtube",
    description: {
      "en-US": "Create attention-grabbing Youtube titles that make people click. Stand out among thousands of videos on Youtube with amazing titles.",
      es: "Genere títulos de Youtube que llamen la atención y hagan que la gente haga clic. Destaca entre miles de vídeos en Youtube con títulos sorprendentes.",
      de: "Erzeugen Sie aufmerksamkeitsstarke Youtube-Titel, die zum Klicken verleiten. Heben Sie sich unter Tausenden von Videos auf Youtube mit tollen Titeln hervor.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
