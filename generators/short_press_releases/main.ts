export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "short_press_releases",
    title: {
      "en-US": "Short Press Releases",
      es: "Comunicados de prensa breves",
      de: "Kurze Pressemitteilungen",
    },
    image: "short_press_releases",
    description: {
      "en-US":
        "Press release that you can use to promote your product or service to the media.",
      es: "Comunicado de prensa que puede utilizar para promocionar su producto o servicio en los medios.",
      "de":
        "Pressemitteilung, mit der Sie Ihr Produkt oder Ihre Dienstleistung in den Medien bewerben können.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
