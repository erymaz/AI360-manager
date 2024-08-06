import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Topic",
        es: "Tema",
        de: "Thema",
      },
      value: "",
      name: "topic",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Be my side forever",
        es: "S\u00e9 mi lado para siempre",
        de: "Sei f\u00fcr immer meine Seite",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Genre",
        es: "G\u00e9nero",
        de: "Genre",
      },
      value: "",
      name: "genre",
      maxLength: 50,
      required: true,
      placeholder: {
        "en-US": "Rock",
        es: "Roca",
        de: "Felsen",
      },
    },
    translationsFormField,
  ];
}
