import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product Description or other text to be translated",
        "en-UK": "Product Description or other text to be translated",
        es: "Descripción del Producto",
        de: "Produktbeschreibung oder anderer zu übersetzender Text",
      },
      placeholder: {
        "en-US": "Write or paste your text here",
        "en-UK": "Write or paste your text here",
        es: "Escribe o pega aqui tu explicación",
        de: "Schreiben oder fügen Sie Ihren Text hier ein",
      },
      value: "",
      name: "product_description",
      required: true, 
      maxLength: 8000,
    },
    translationsFormField,
  ];
}
