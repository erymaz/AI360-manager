import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
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
      required: true,
      placeholder: {
        "en-US": "Bouyancy",
        es: "flotabilidad",
        de: "Auftrieb",
      },
    },
    translationsFormField,
  ];
}
