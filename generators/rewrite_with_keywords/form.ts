import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Article",
        es: "Art\u00edculo",
        de: "Artikel",
      },
      value: "",
      name: "article",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Remove the friction from your morning by preparing the night before. Simple preparations like setting up your first work task and putting out the ingredients for a nutritious breakfast can go a long way.",
        es: "Elimine la fricci\u00f3n de su ma\u00f1ana prepar\u00e1ndose la noche anterior. Los preparativos simples, como establecer su primera tarea de trabajo y preparar los ingredientes para un desayuno nutritivo, pueden ser muy \u00fatiles.",
        "de":
          "Beseitigen Sie die Reibung am Morgen, indem Sie es am Vorabend vorbereiten. Einfache Vorbereitungen wie das Einrichten Ihrer ersten Arbeitsaufgabe und das Bereitstellen der Zutaten f\u00fcr ein nahrhaftes Fr\u00fchst\u00fcck k\u00f6nnen viel bewirken.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Keywords",
        es: "Palabras clave",
        de: "Schl\u00fcsselw\u00f6rter",
      },
      value: "",
      name: "keywords",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "healthy breakfast tip",
        es: "consejo de desayuno saludable",
        de: "Gesunder Fr\u00fchst\u00fcckstipp",
      },
    },
    translationsFormField,
  ];
}
