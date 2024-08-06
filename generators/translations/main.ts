export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "translations",
    title: {
      "en-US": "Generate Translations in more than 100 languages",
      "en-UK": "Generate Translations in more than 100 languages",
      es: "Genere traducciones en más de 100 idiomas",
      de: "Generieren Sie Übersetzungen in mehr als 100 Sprachen",
    },
    description: {
      "en-US":
        "Translate descriptions, attributes, messages. You choose your desired language and we do the hard work! Translate any text for your stores into +100 languages.",
      "en-UK":
        "Translate descriptions, attributes, messages. You choose your desired language and we do the hard work! Translate any text for your stores into +100 languages.",
      es: "Traduzca descripciones, atributos, mensajes. Usted elige el idioma deseado y nosotros hacemos el trabajo duro. Traduzca cualquier texto para sus tiendas a +100 idiomas.",
      "de":
        "Übersetzen Sie Beschreibungen, Attribute, Nachrichten. Sie wählen Ihre gewünschte Sprache und wir machen die harte Arbeit! Lassen Sie jeden Text für Ihre Geschäfte in über 100 Sprachen automatisch übersetzen.",
    },
    image: "translations",
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
