import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Company Name",
        es: "nombre de empresa",
        de: "Name der Firma",
      },
      value: "",
      name: "company_name",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "wAIpify",
        es: "wAIpify",
        de: "wAIpify",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Company Description",
        es: "Descripci\u00f3n de la compa\u00f1\u00eda",
        de: "Firmen Beschreibung",
      },
      value: "",
      name: "company_description",
      maxLength: 300,
      required: true,
      placeholder: {
        "en-US":
          "wAIpify is an AI copywriting startup. helps compose high-performing landing pages, product descriptions, ads, and blog posts in seconds. 1000+ 5-star reviews.",
        es: "wAIpify es una startup de redacci\u00f3n de textos publicitarios de IA. ayuda a crear p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos. M\u00e1s de 1000 rese\u00f1as de 5 estrellas.",
        "de":
          "wAIpify ist ein KI-Texter-Startup. hilft dabei, in Sekundenschnelle leistungsstarke Landingpages, Produktbeschreibungen, Anzeigen und Blogbeitr\u00e4ge zu erstellen. \u00dcber 1000 5-Sterne-Bewertungen.",
      },
    },
    translationsFormField,
  ];
}
