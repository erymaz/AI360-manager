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
      maxLength: 150,
      required: true,
      placeholder: {
        "en-US": "Get daily meals delivered to you in quickest time.",
        es: "Reciba las comidas diarias en el menor tiempo posible.",
        "de":
          "Lassen Sie sich die t\u00e4glichen Mahlzeiten in k\u00fcrzester Zeit liefern.",
      },
    },
    translationsFormField,
  ];
}
