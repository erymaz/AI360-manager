export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "real_estate_listing",
    title: {
      "en-US": "Real estate listing descriptions",
      es: "Descripciones de listados de bienes raíces",
      de: "Beschreibungen von Immobilieneinträgen",
    },
    image: "real_estate_listing",
    description: {
      "en-US":
        "Copy that makes your real-estate listings stand out from the crowd.",
      es: "Copia que hace que sus listados de bienes raíces se destaquen entre la multitud.",
      "de":
        "Texte, mit denen sich Ihre Immobilienanzeigen von der Masse abheben.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
