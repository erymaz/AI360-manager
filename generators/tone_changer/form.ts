import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Content",
        es: "Contenido",
        de: "Inhalt",
      },
      value: "",
      name: "content",
      maxLength: 500,
      required: true,
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Tone",
        es: "Tono",
        de: "Ton",
      },
      value: "",
      name: "tone",
      maxLength: 100,
      required: true,
    },
    translationsFormField,
  ];
}
