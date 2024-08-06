import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Paragraph",
        es: "P\u00e1rrafo",
        de: "Absatz",
      },
      value: "",
      name: "paragraph",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "AI copywriting tool that makes it super easy and fast for you to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.",
        es: "Herramienta de redacci\u00f3n de textos publicitarios de IA que hace que sea s\u00faper f\u00e1cil y r\u00e1pido para usted redactar p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos.",
        "de":
          "KI-Texterstellungstool, mit dem Sie ganz einfach und schnell in Sekundenschnelle leistungsstarke Landingpages, Produktbeschreibungen, Anzeigen und Blogbeitr\u00e4ge erstellen k\u00f6nnen.",
      },
    },
    translationsFormField,
  ];
}
