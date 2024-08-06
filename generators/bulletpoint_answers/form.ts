import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Question",
        es: "Pregunta",
        de: "Frage",
      },
      value: "",
      name: "question",
      maxLength: 150,
      required: true,
      placeholder: {
        "en-US": "What are some advantages of AI?",
        es: "\u00bfCu\u00e1les son algunas de las ventajas de la IA?",
        de: "Welche Vorteile bietet KI?",
      },
    },
    translationsFormField,
  ];
}
