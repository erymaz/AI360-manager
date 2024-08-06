import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Paragraph Title",
        es: "T\u00edtulo del p\u00e1rrafo",
        de: "Absatztitel",
      },
      value: "",
      name: "paragraph_title",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "AI and Future",
        es: "IA y futuro",
        de: "KI und Zukunft",
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
      maxLength: 100,
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Keywords",
        es: "Palabras clave",
        de: "Schl\u00fcsselw\u00f6rter",
      },
      value: "",
      name: "keywords",
      maxLength: 100,
    },
    translationsFormField,
  ];
}
