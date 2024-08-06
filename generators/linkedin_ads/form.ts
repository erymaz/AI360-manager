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
        "en-US": "wAIpify",
        es: "wAIpify",
        de: "wAIpify",
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
          "wAIpify makes it super easy and fast for you to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.",
        es: "wAIpify hace que sea s\u00faper f\u00e1cil y r\u00e1pido para usted componer p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos.",
        "de":
          "Mit wAIpify k\u00f6nnen Sie ganz einfach und schnell in Sekundenschnelle leistungsstarke Landingpages, Produktbeschreibungen, Anzeigen und Blogbeitr\u00e4ge erstellen.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Target Keywords",
        es: "Palabras clave objetivo",
        de: "Zielschl\u00fcsselw\u00f6rter",
      },
      value: "",
      name: "target_keywords",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "landing page, Google ads, Facebook ads,",
        es: "p\u00e1gina de destino, anuncios de Google, anuncios de Facebook,",
        de: "Landingpage, Google-Anzeigen, Facebook-Anzeigen,",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Promotion",
        es: "Promoci\u00f3n",
        de: "F\u00f6rderung",
      },
      value: "",
      name: "promotion",
      placeholder: {
        "en-US": "20% Off with code SONIC20",
        es: "20% de descuento con el c\u00f3digo SONIC20",
        de: "20 % Rabatt mit dem Code SONIC20",
      },
    },
    translationsFormField,
  ];
}
