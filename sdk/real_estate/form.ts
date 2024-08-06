import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Property address",
        "en-UK": "Property address",
        es: "Dirección de la propiedad",
        de: "Grundstücksadresse",
      },
      placeholder: {
        "en-US": "1600 Pennsylvania Avenue NW Washington, D.C. 20500",
        "en-UK": "42 Elm Street London WC2N 5DU United Kingdom",
        es: "Calle de la Paloma, 15 28013 Madrid Spain",
        de: "Mühlbruchstraße 13, 60594 Frankfurt am Main",
      },
      value: "",
      name: "address",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Don't show exact address",
        "en-UK": "Don't show exact address",
        es: "No mostrar dirección exacta",
        de: "Genaue Adresse nicht anzeigen",
      },
      name: "dont_show_exact_address",
      checked: true,
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        "en-US": "Translation languages",
        es: "Idiomas de traducci\u00f3n",
        de: "\u00dcbersetzungssprachen",
      },
      value: [],
      name: "translations",
      options: [
        {
          label: {
            "en-US": "English",
            es: "Ingl\u00e9s",
            de: "Englisch",
          },
          value: "en-US",
        },
        {
          label: {
            "en-US": "Spanish",
            es: "Espa\u00f1ol",
            de: "Spanisch",
          },
          value: "es",
        },
        {
          label: {
            "en-US": "German",
            es: "Alem\u00e1n",
            de: "Deutsch",
          },
          value: "de",
        },
      ],
    },
  ];
}
