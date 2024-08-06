import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product Name",
        es: "nombre del producto",
        de: "Produktname",
      },
      value: "",
      name: "product_name",
      maxLength: 100,
      required: true,
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Experience",
        es: "Experiencia",
        de: "Erfahrung",
      },
      value: "",
      name: "experience",
      maxLength: 100,
      required: true,
    },
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
    },
    translationsFormField,
  ];
}
