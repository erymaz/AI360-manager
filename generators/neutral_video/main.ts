export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "neutral_video",
    title: {
      "en-US": "Turn Your Product & Content Pages into a Captivating Video in a Few Clicks",
      "en-UK": "Turn Your Product & Content Pages into a Captivating Video in a Few Clicks",
      es: "Convierta sus páginas de productos y contenidos en un vídeo cautivador con unos pocos clics",
      de: "Verwandeln Sie Ihre Produkt- und Inhaltsseiten mit ein paar Klicks in ein fesselndes Video",
    },
    description: {
      "en-US": "Automatically generate a captivating video with the images you want without a film crew. You can choose an avatar and AI-generated voice and get a professional looking video in a few clicks.",
      "en-UK": "Automatically generate a captivating video with the images you want without a film crew. You can choose an avatar and AI-generated voice and get a professional looking video in a few clicks.",
      es: "Genera automáticamente un vídeo cautivador con las imágenes que desees sin necesidad de un equipo de rodaje. Puedes elegir un avatar y una voz generada por IA y obtener un vídeo de aspecto profesional en unos pocos clics.",
      de: "Erstellen Sie automatisch ein fesselndes Video mit den von Ihnen gewünschten Bildern, ohne dass ein Filmteam benötigt wird. Sie können einen Avatar und eine KI-generierte Stimme auswählen und erhalten mit wenigen Klicks ein professionell aussehendes Video.",
    },
    image: "text-to-video",
    contentType: "video",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
