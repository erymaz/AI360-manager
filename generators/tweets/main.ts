export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "tweets",
    title: {
      "en-US": "Tweet Generator",
      es: "Generador de tweets",
      de: "Tweet-Generator",
    },
    image: "tweets",
    description: {
      "en-US": "Create punchy and personalized tweets to amplify your voice and build community.",
      es: "Crea tweets impactantes y personalizados para amplificar tu voz y crear comunidad.",
      de: "Erstellen Sie aussagekräftige und personalisierte Tweets, um Ihre Stimme zu verstärken und eine Community aufzubauen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
