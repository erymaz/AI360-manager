import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Search Term",
        es: "T\u00e9rmino de b\u00fasqueda",
        de: "Suchbegriff",
      },
      value: "",
      name: "search_term",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "AI in copywriting",
        es: "IA en redacci\u00f3n",
        de: "KI im Copywriting",
      },
    },
    translationsFormField,
  ];
}
