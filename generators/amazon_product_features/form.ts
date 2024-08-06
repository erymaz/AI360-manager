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
      placeholder: {
        "en-US": "Buddha\u2019s Blend Sachets",
        es: "Sobres de mezcla de Buda",
        de: "Beutel mit Buddha-Mischung",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product Description",
        es: "Descripci\u00f3n del Producto",
        de: "Produktbeschreibung",
      },
      value: "",
      name: "product_description",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Buddha\u2019s Blend Sachets are a fresh, delicate mix of white and green tea with jasmine pearls for a sweet floral perfume. Just sit back, relax and take a sip. Pure bliss.",
        es: "Los sobres de mezcla de Buda son una mezcla fresca y delicada de t\u00e9 blanco y verde con perlas de jazm\u00edn para un dulce perfume floral. Solo si\u00e9ntate, rel\u00e1jate y toma un sorbo. Pura felicidad.",
        "de":
          "Buddha\u2019s Blend Sachets sind eine frische, zarte Mischung aus wei\u00dfem und gr\u00fcnem Tee mit Jasminperlen f\u00fcr einen s\u00fc\u00dfen, blumigen Duft. Lehnen Sie sich einfach zur\u00fcck, entspannen Sie sich und nehmen Sie einen Schluck. Reine Gl\u00fcckseligkeit.",
      },
    },
    translationsFormField,
  ];
}
