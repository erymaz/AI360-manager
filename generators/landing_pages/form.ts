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
        "en-US": "Webflow",
        es: "Flujo web",
        de: "Webflow",
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
          "Webflow_is_an_in_build_and_launch_responsive_websites_visually",
        es: "Webflow_is_an_in_build_and_launch_responsive_websites_visually",
        "de":
          "Webflow_is_an_in_build_and_launch_responsive_websites_visually",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Feature 1",
        es: "Caracter\u00edstica 1",
        de: "Merkmal 1",
      },
      value: "",
      name: "feature_1",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Build production-ready experiences without coding",
        es: "Cree experiencias listas para producci\u00f3n sin codificaci\u00f3n",
        "de":
          "Erstellen Sie produktionsreife Erlebnisse ohne Programmierung",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Feature 2",
        es: "Caracter\u00edstica 2",
        de: "Merkmal 2",
      },
      value: "",
      name: "feature_2",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Deploy on a hosting network that scales with your business",
        es: "Implemente en una red de hospedaje que escala con su negocio",
        "de":
          "Stellen Sie es in einem Hosting-Netzwerk bereit, das mit Ihrem Unternehmen w\u00e4chst",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Feature 3",
        es: "Caracter\u00edstica 3",
        de: "Merkmal 3",
      },
      value: "",
      name: "feature_3",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Create, launch, and iterate on new marketing campaigns",
        es: "Crear, lanzar e iterar nuevas campa\u00f1as de marketing",
        de: "Erstellen, starten und iterieren Sie neue Marketingkampagnen",
      },
    },
    translationsFormField,
  ];
}
