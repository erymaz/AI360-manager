export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "tiktok_hooks",
    title: {
      "en-US": "TikTok Video Hooks",
      es: "Ganchos de video de TikTok",
      de: "TikTok-Video-Hooks",
    },
    image: "tiktok_hooks",
    description: {
      "en-US": "Perfect TikTok video hook to get more views and followers.",
      es: "El gancho de video TikTok perfecto para obtener más vistas y seguidores.",
      "de":
        "Perfekter TikTok-Video-Hook, um mehr Aufrufe und Follower zu erhalten.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
