export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "story_generation",
    title: {
      "en-US": "Stories",
      es: "Cuentos",
      de: "Geschichten",
    },
    image: "story_generation",
    description: {
      "en-US":
        "Engaging and persuasive stories that will capture your reader's attention and interest.",
      es: "Historias atractivas y persuasivas que captarán la atención y el interés de sus lectores.",
      "de":
        "Fesselnde und überzeugende Geschichten, die die Aufmerksamkeit und das Interesse Ihres Lesers wecken.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
