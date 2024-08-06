export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "landing_page_headlines",
    title: {
      "en-US": "Create Landing Pages Headlines that Drive Interest and Increase Conversion",
      es: "Titulares de landing pages",
      de: "Erstellen Sie Überschriften für Landingpages, die das Interesse und Konversion steigern",
    },
    image: "landing_page_headlines",
    description: {
      "en-US":
        "Create unique and perecise headlines that are perfect for your story to drive valueable traffic to your site.",
      es: "Titulares únicos y pegadizos que son perfectos para su producto o servicio.",
      "de":
        "Erstellen Sie einzigartige und präzise Schlagzeilen, die perfekt zu Ihrer Geschichte passen, um wertvollen Traffic auf Ihre Website zu bringen",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 3,
  };
}
