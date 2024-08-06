import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
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
          "wAIpify makes it super easy and fast for you to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.",
        es: "wAIpify hace que sea s\u00faper f\u00e1cil y r\u00e1pido para usted componer p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos.",
        "de":
          "Mit wAIpify k\u00f6nnen Sie ganz einfach und schnell in Sekundenschnelle leistungsstarke Landingpages, Produktbeschreibungen, Anzeigen und Blogbeitr\u00e4ge erstellen.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Feature",
        es: "Caracter\u00edstica",
        de: "Besonderheit",
      },
      value: "",
      name: "feature",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "write high-converting landing pages within seconds",
        es: "escriba p\u00e1ginas de destino de alta conversi\u00f3n en segundos",
        "de":
          "Schreiben Sie innerhalb von Sekunden Landingpages mit hoher Conversion-Rate",
      },
    },
    translationsFormField,
  ];
}
