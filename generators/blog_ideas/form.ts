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
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "Artificial Intelligence in Copywriting",
        es: "Inteligencia artificial en la redacci\u00f3n",
        de: "K\u00fcnstliche Intelligenz im Copywriting",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Primary Keyword",
        es: "Palabra clave principal",
        de: "Prim\u00e4res Schl\u00fcsselwort",
      },
      value: "",
      name: "primary_keyword",
    },
    translationsFormField,
  ];
}
