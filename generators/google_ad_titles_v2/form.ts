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
          "wAIpify makes it super easy and fast for you to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.",
        es: "wAIpify hace que sea s\u00faper f\u00e1cil y r\u00e1pido para usted componer p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos.",
        "de":
          "Mit wAIpify k\u00f6nnen Sie ganz einfach und schnell in Sekundenschnelle leistungsstarke Landingpages, Produktbeschreibungen, Anzeigen und Blogbeitr\u00e4ge erstellen.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Keyword",
        es: "Palabra clave",
        de: "Stichwort",
      },
      value: "",
      name: "keyword",
      maxLength: 50,
      required: true,
      placeholder: {
        "en-US": "AI Writer",
        es: "Escritor de IA",
        de: "KI-Autor",
      },
    },
    translationsFormField,
  ];
}
