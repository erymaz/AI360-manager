export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "tone_changer",
    title: {
      "en-US": "Tone Changer",
      es: "Cambiador de tono",
      de: "Tonwechsler",
    },
    image: "tone_changer",
    description: {
      "en-US":
        "Change the tone of your writing to match your audience and copy.",
      es: "Cambie el tono de su escritura para que coincida con su audiencia y copia.",
      "de":
        "Ändern Sie den Ton Ihres Schreibens, um es an Ihre Zielgruppe und Ihren Text anzupassen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
