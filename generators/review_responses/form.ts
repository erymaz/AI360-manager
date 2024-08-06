import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Review",
        es: "Valoracion",
        de: "Rezension",
      },
      value: "",
      name: "review",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Please, paste the text of the review you want to reply to, here",
        es: "Recientemente me encontr\u00e9 con wAIpify y qued\u00e9 impresionado por su herramienta de generaci\u00f3n de contenido de IA. Creo que es un gran salvavidas para aut\u00f3nomos y propietarios de agencias como yo. Pude terminar los art\u00edculos con ediciones m\u00ednimas en 10-15 minutos, mientras que por lo general me tom\u00f3 m\u00e1s de 1 hora escribir uno desde cero.",
        "de": "Bitte fügen Sie den Text der Rezension, auf die Sie antworten möchten, hier ein",
      },
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Type",
        es: "Tipo",
        de: "Typ",
      },
      value: "",
      name: "type",
      required: true,
      placeholder: {
        "en-US": "Please select",
        es: "Seleccione una opción",
        de: "Bitte wählen Sie eine",
      },
       options: [
        {
          label: {
            "en-US": "Positive",
            es: "Positiva",
            de: "Positiv",
          },
          value: "positive",
        },
        {
          label: {
            "en-US": "Neutral",
            es: "Neutra",
            de: "Neutral",
          },
          value: "neutral",
        },
        {
          label: {
            "en-US": "Negative",
            es: "Negativa",
            de: "Negativ",
          },
          value: "negative",
        },
        {
          label: {
            "en-US": "Rude",
            es: "Maleducada",
            de: "Unhöflich",
          },
          value: "rude",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Company",
        es: "Compa\u00f1\u00eda",
        de: "Unternehmen",
      },
      value: "",
      name: "company",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Please, write your company name",
        es: "wAIpify",
        de: "Bitte geben Sie Ihren Unternehmensnamen ein",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Contact",
        es: "Contacto",
        de: "Kontakt",
      },
      value: "",
      name: "contact",
      required: true,
      placeholder: {
        "en-US": "Please, add here your support email address",
        es: "soporte@wAIpify.com",
        de: "Geben Sie hier Ihre E-mail Support Kontaktadresse ein",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "User",
        es: "Usuario",
        de: "Benutzer",
      },
      value: "",
      name: "user",
      required: true,
      placeholder: {
        "en-US": "Name of the person who made the review",
        es: "Alex",
        de: "Name der Person, die die Rezension vorgenommen hat",
      },
    },
    translationsFormField,
  ];
}
