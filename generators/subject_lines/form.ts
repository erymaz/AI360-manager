import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product",
        es: "Producto",
        de: "Produkt",
      },
      value: "",
      name: "product",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "wAIpify's Chrome Extension",
        es: "Extensi\u00f3n de cromo de wAIpify",
        de: "wAIpifys Chrome-Erweiterung",
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
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Launch of wAIpify\u2019s chrome extension that lets anyone rephrase, expand and shorten their content within seconds.",
        es: "Lanzamiento de la extensi\u00f3n de Chrome de wAIpify que permite reformular, expandir y acortar su contenido en segundos.",
        "de":
          "Einf\u00fchrung der Chrome-Erweiterung von wAIpify, mit der jeder seine Inhalte innerhalb von Sekunden umformulieren, erweitern und k\u00fcrzen kann.",
      },
    },
    translationsFormField,
  ];
}
