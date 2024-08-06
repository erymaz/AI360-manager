export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "images",
    title: {
      "en-US": "Image Processing And Editing",
      es: "",
      de: "",
    },
    image: "images",
    description: {
      "en-US": "Generators for image processing and editing.",
      es: "",
      de: "",
    },
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    contentType: "text",
    interactions: [],
  };
}
