import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Content To Expand",
        es: "Contenido para expandir",
        de: "Inhalt zum Erweitern",
      },
      value: "",
      name: "content_to_expand",
      maxLength: 1000,
      required: true,
      placeholder: {
        "en-US": "Copywriting is hard.",
        es: "La redacci\u00f3n publicitaria es dif\u00edcil.",
        de: "Copywriting ist schwer.",
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
      placeholder: {
        "en-US": "excited",
        es: "entusiasmado",
        de: "aufgeregt",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Keyword",
        es: "Palabra clave",
        de: "Stichwort",
      },
      value: "",
      name: "keyword",
      maxLength: 100,
    },
    translationsFormField,
  ];
}
