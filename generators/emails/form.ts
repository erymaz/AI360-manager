import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Key Points",
        es: "Puntos clave",
        de: "Wichtige Punkte",
      },
      value: "",
      name: "key_points",
      maxLength: 300,
      required: true,
      placeholder: {
        "en-US": "* appreciate the OpenAI team for their amazing product",
        es: "* agradezco al equipo de OpenAI por su incre\u00edble producto",
        "de":
          "* danken dem OpenAI-Team f\u00fcr sein gro\u00dfartiges Produkt",
      },
    },
    translationsFormField,
  ];
}
