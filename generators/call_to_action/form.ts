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
        "en-US": "A company that specializes in consumer electronics.",
        es: "Una empresa que se especializa en electr\u00f3nica de consumo.",
        "de":
          "Ein Unternehmen, das sich auf Unterhaltungselektronik spezialisiert hat.",
      },
    },
    translationsFormField,
  ];
}
