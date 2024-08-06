export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "tiktok_scripts",
    title: {
      "en-US": "TikTok Video Scripts",
      es: "Guiones de video de TikTok",
      de: "TikTok-Videoskripte",
    },
    image: "tiktok_scripts",
    description: {
      "en-US":
        "Video scripts that are ready to shoot and will make you go viral.",
      es: "Guiones de video que están listos para filmar y te harán viral.",
      "de":
        "Videodrehbücher, die sofort drehbereit sind und Sie viral machen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
