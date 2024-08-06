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
      maxLength: 300,
      required: true,
      placeholder: {
        "en-US": "What are the benefits of almonds ?",
        es: "\u00bfCu\u00e1les son los beneficios de las almendras?",
        de: "Welche Vorteile haben Mandeln?",
      },
    },
    translationsFormField,
  ];
}
