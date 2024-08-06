import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Recipient",
        es: "Recipiente",
        de: "Empf\u00e4nger",
      },
      value: "",
      name: "recipient",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Please, write here a name or email",
        es: "Escriba aqui un nombre o correo electronico",
        de: "Schreiben Sie hier einen Namen oder E-Mail-Adresse",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Recipient Position",
        es: "Posici\u00f3n del destinatario",
        de: "Empf\u00e4ngerposition",
      },
      value: "",
      name: "recipient_position",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "e.g. Customer",
        es: "Por ejemplo, Cliente",
        de: "z.B. Kunde",
      },
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
      maxLength: 300,
      required: true,
      placeholder: {
        "en-US":
          "Please, describe what you want to tell the recipient, briefly but with detail",
        es: "nos gustar\u00eda suscribirnos a la API comercial de wAIpify para uso comercial",
        "de":
          "Bitte beschreiben Sie kurz, aber ausf\u00dchrlich, was Sie dem Empf\u00e4nger mitteilen möchten",
      },
    },
    translationsFormField,
  ];
}
