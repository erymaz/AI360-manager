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
      maxLength: 400,
      required: true,
      placeholder: {
        "en-US": "Artificial Intelligence in Copywriting",
        es: "Inteligencia artificial en la redacci\u00f3n",
        de: "K\u00fcnstliche Intelligenz im Copywriting",
      },
    },
    translationsFormField,
  ];
}
