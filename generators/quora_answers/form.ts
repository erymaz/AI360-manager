import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Question",
        es: "Pregunta",
        de: "Frage",
      },
      value: "",
      name: "question",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "What are the benefits of almonds ?",
        es: "\u00bfCu\u00e1les son los beneficios de las almendras?",
        de: "Welche Vorteile haben Mandeln?",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Info",
        es: "Informaci\u00f3n",
        de: "Die Info",
      },
      value: "",
      name: "info",
      maxLength: 600,
      placeholder: {
        "en-US":
          "health benefits of almonds include lower blood sugar levels, reduced blood pressure and lower cholesterol levels.",
        es: "Los beneficios para la salud de las almendras incluyen niveles m\u00e1s bajos de az\u00facar en la sangre, presi\u00f3n arterial reducida y niveles m\u00e1s bajos de colesterol.",
        "de":
          "Zu den gesundheitlichen Vorteilen von Mandeln z\u00e4hlen ein niedrigerer Blutzuckerspiegel, eine Senkung des Blutdrucks und ein niedrigerer Cholesterinspiegel.",
      },
    },
    translationsFormField,
  ];
}
