export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "social_media",
    title: {
      "en-US": "Social Media Posts for Any Industries",
      es: "Publicaciones en Redes Sociales para Cualquier Industria",
      de: "Social-Media-Posts für jede Branche",
    },
    image: "social_media",
    description: {
      "en-US": "Generate social media post for any industries / products.",
      es: "Genera publicaciones en redes sociales para cualquier industria / producto.",
      "de":
        "Erzeugen Sie Social-Media-Posts für jede Branche / jedes Produkt.",
    },
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    contentType: "text",
    interactions: [],
  };
}
