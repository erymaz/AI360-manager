import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Content To Rephrase",
        es: "Contenido para reformular",
        de: "Inhalt zum Umformulieren",
      },
      value: "",
      name: "content_to_rephrase",
      maxLength: 1000,
      required: true,
      placeholder: {
        "en-US":
          "We're pretty sure we found the key to achieving nirvana, and it starts with this fresh, delicate mix of white and green tea.",
        es: "Estamos bastante seguros de que encontramos la clave para alcanzar el nirvana, y comienza con esta mezcla fresca y delicada de t\u00e9 blanco y verde.",
        "de":
          "Wir sind uns ziemlich sicher, dass wir den Schl\u00fcssel zum Erreichen des Nirvana gefunden haben, und der beginnt mit dieser frischen, delikaten Mischung aus wei\u00dfem und gr\u00fcnem Tee.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Tone Of Voice",
        es: "Tono de voz",
        de: "Tonfall",
      },
      value: "",
      name: "tone_of_voice",
      maxLength: 25,
      placeholder: {
        "en-US": "excited",
        es: "entusiasmado",
        de: "aufgeregt",
      },
    },
    translationsFormField,
  ];
}
