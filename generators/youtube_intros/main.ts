export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "youtube_intros",
    title: {
      "en-US": "Create YouTube Intros for Your Videos",
      es: "Crea intros de YouTube para tus vídeos",
      de: "YouTube-Intros für Ihre Videos erstellen",
    },
    image: "youtube",
    description: {
      "en-US": "Create catchy Youtube intros that highlight main video points, draw attention, and keep viewers watching.",
      es: "Crea intros de Youtube pegadizas que destaquen los puntos principales del vídeo, llamen la atención y mantengan a los espectadores atentos.",
      de: "Erstellen Sie ein einprägsames Youtube-Intro, das die wichtigsten Punkte des Videos hervorhebt, die Aufmerksamkeit auf sich zieht und die Zuschauer beim Anschauen hält.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
