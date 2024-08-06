export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "real_estate_video",
    title: {
      "en-US": "Convert your Listing into a Captivating Video in a Few Minutes",
      "en-UK": "Convert your Listing into a Captivating Video in a Few Minutes",
      es: "Convierta un listado en un vídeo cautivador en segundos",
      de: "Wandeln Sie Ihr Exposé in Minutenschnelle in ein Video um",
    },
    description: {
      "en-US":
        "Our technology will use the text from your property to automatically generate a captivating video with the images you want. You can choose an avatar from our list. Make use of AI-generated voice and get a professional video in a few clicks.",
      "en-UK":
        "Our technology will use the text from your property to automatically generate a captivating video with the images you want. You can choose an avatar from our list. Make use of AI-generated voice and get a professional video in a few clicks.",
      es: "Nuestra tecnología utilizará el texto de su propiedad para generar automáticamente un vídeo cautivador con las imágenes que desee. Puede elegir un avatar de nuestra lista. Haz uso de la voz generada por IA y consigue un vídeo profesional en unos pocos clics.",
      "de":
        "Unsere Technologie verwendet den Text aus Ihrem Exposé um automatisch ein fesselndes Video mit den gewünschten Bildern zu erstellen. Mit KI-generierter Stimme und Avatar. Reduzieren Sie drastisch Ihre Prozesszeit und Kosten.",
    },
    image: "real-estate-text-to-video",
    contentType: "video",
    credits_per_use: 2,
    cost_per_use: 350,
    promoted: 0,
    popularity: 1,
  };
}
