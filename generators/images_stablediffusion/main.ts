export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "images_stablediffusion",
    title: {
      "en-US": "Image Processing And Editing Using Stable Diffusion",
      es: "",
      de: "",
    },
    image: "images_stablediffusion",
    description: {
      "en-US": "Generators for image processing and editing using Stable Diffusion.",
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
