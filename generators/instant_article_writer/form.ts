import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Article Title",
        es: "T\u00edtulo del art\u00edculo",
        de: "Artikel\u00fcberschrift",
      },
      value: "",
      name: "article_title",
      maxLength: 300,
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
