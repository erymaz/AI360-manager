import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Description",
        es: "Descripci\u00f3n",
        de: "Beschreibung",
      },
      value: "",
      name: "description",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US": "How to bake a apple pie for father's day",
        es: "C\u00f3mo hacer una tarta de manzana para el d\u00eda del padre",
        de: "Wie man einen Apfelkuchen zum Vatertag backt",
      },
    },
    translationsFormField,
  ];
}
