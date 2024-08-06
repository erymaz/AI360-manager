export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "startup_ideas",
    title: {
      "en-US": "Startup Ideas",
      es: "Ideas de inicio",
      de: "Startup-Ideen",
    },
    image: "startup_ideas",
    description: {
      "en-US": "Great startup ideas that you can get started on right away.",
      es: "Grandes ideas de inicio con las que puede comenzar de inmediato.",
      de: "Tolle Startup-Ideen, mit denen Sie sofort loslegen können.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
