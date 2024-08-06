export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "listicle_ideas",
    title: {
      "en-US": "Listicle Ideas",
      es: "Ideas para listas",
      de: "Listicle-Ideen",
    },
    image: "listicle_ideas",
    description: {
      "en-US":
        "Creative listicle ideas that are easy to write and perform well on social media.",
      es: "Ideas de listas creativas que son fáciles de escribir y funcionan bien en las redes sociales.",
      "de":
        "Kreative Listicle-Ideen, die einfach zu schreiben sind und in den sozialen Medien gut ankommen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
