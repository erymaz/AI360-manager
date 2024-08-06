export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "instagram_hashtags",
    title: {
      "en-US": "Trending Instagram Hashtags",
      es: "Hashtags de tendencia en Instagram",
      de: "Trendige Instagram-Hashtags",
    },
    image: "instagram",
    description: {
      "en-US":
        "Increase the discoverability of your Instagram posts with AI-suggested hashtags. Save time on searching for the right hashtags and get followers and engagement faster.",
      es: "Aumenta la visibilidad de tus publicaciones de Instagram con hashtags sugeridos por IA. Ahorra tiempo buscando los hashtags adecuados y consigue seguidores y engagement más rápido.",
      de:
        "Erhöhen Sie die Auffindbarkeit Ihrer Instagram-Posts mit KI-vorgeschlagenen Hashtags. Sparen Sie Zeit bei der Suche nach den richtigen Hashtags und erhalten Sie schneller Follower und Engagement.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
