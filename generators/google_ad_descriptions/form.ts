import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product, Company or Service Name",
        es: "nombre del producto",
        de: "Produkt-, Firmen- oder Dienstleistungsname",
      },
      value: "",
      name: "product_name",
      maxLength: 100,
      required: true,
      placeholder: {
         "en-US": "Please, write it here",
        es: "Mejor aplicaci\u00f3n de redacci\u00f3n",
        de: "Bitte schreiben Sie es hier",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Description",
        es: "Descripci\u00f3n del Producto",
        de: "Beschreibung",
      },
      value: "",
      name: "product_description",
      maxLength: 400,
      required: true,
      placeholder: {
        "en-US":
          "Please write here a description of what you want to promote",
        es: "wAIpify hace que sea s\u00faper f\u00e1cil y r\u00e1pido para usted componer p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos.",
        "de":
          "Bitte geben Sie hier eine Beschreibung dessen, was Sie fördern möchten ",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Primary Keyword",
        es: "Palabra clave principal",
        de: "Prim\u00e4res Schl\u00fcsselwort",
      },
      value: "",
      name: "primary_keyword",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Please, write it here",
        es: "Mejor aplicaci\u00f3n de redacci\u00f3n",
        de: "Bitte schreiben Sie es hier",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Secondary Keywords",
        es: "Palabras clave secundarias",
        de: "Sekund\u00e4re Schl\u00fcsselw\u00f6rter",
      },
      value: "",
      name: "secondary_keywords",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Please, write them here",
        es: "p\u00e1gina de destino, anuncios de Google, anuncios de Facebook,",
        de: "Bitte schreiben Sie sie hier durch Kommas getrennt",
      },
    },
    translationsFormField,
  ];
}
