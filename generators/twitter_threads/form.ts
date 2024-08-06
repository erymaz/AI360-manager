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
    },
    translationsFormField,
  ];
}
