export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_intros_v2",
    title: {
      "en-US": "Generate YouTube Intros V2",
      es: "Generar YouTube Intros V2",
      de: "YouTube-Intros generieren V2",
    },
    image: "youtube",
    description: {
      "en-US": "Create catchy Youtube intros that highlight main video points, draw attention, and keep viewers watching.",
      es: "Crear intros de Youtube pegadizas que destaquen los puntos principales del vídeo, llamen la atención y mantengan a los espectadores atentos.",
      de: "Erstellen Sie einprägsame Youtube-Intros, die die wichtigsten Punkte des Videos hervorheben, die Aufmerksamkeit auf sich ziehen und die Zuschauer zum Anschauen anhalten",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
