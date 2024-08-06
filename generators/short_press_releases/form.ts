import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Information",
        es: "Informaci\u00f3n",
        de: "Information",
      },
      value: "",
      name: "information",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "wAIpify launches an AI-powered copywriting app that makes it super easy and fast for businesses to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.",
        es: "wAIpify lanza una aplicaci\u00f3n de redacci\u00f3n impulsada por IA que hace que sea muy f\u00e1cil y r\u00e1pido para las empresas redactar p\u00e1ginas de destino, descripciones de productos, anuncios y publicaciones de blog de alto rendimiento en segundos.",
        "de":
          "wAIpify bringt eine KI-gest\u00fctzte Copywriting-App auf den Markt, mit der Unternehmen ganz einfach und schnell in Sekundenschnelle leistungsstarke Landingpages, Produktbeschreibungen, Anzeigen und Blogbeitr\u00e4ge erstellen k\u00f6nnen.",
      },
    },
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
        "en-US": "Target Keyword",
        es: "Palabra clave objetivo",
        de: "Zielschl\u00fcsselwort",
      },
      value: "",
      name: "target_keyword",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "landing page, Google ads, Facebook ads,",
        es: "p\u00e1gina de destino, anuncios de Google, anuncios de Facebook,",
        de: "Landingpage, Google-Anzeigen, Facebook-Anzeigen,",
      },
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Tone of voice",
        es: "Tono de voz",
        de: "Tonfall",
      },
      value: "",
      name: "tone_of_voice",
      options: [
        {
          label: {
            "en-US": "excited",
            es: "entusiasmado",
            de: "aufgeregt",
          },
          value: "excited",
        },
        {
          label: {
            "en-US": "professional",
            es: "profesional",
            de: "Fachmann",
          },
          value: "professional",
        },
        {
          label: {
            "en-US": "funny",
            es: "divertido",
            de: "lustig",
          },
          value: "funny",
        },
        {
          label: {
            "en-US": "encouraging",
            es: "alentador",
            de: "ermutigend",
          },
          value: "encouraging",
        },
        {
          label: {
            "en-US": "dramatic",
            es: "dram\u00e1tico",
            de: "dramatisch",
          },
          value: "dramatic",
        },
        {
          label: {
            "en-US": "witty",
            es: "ingenioso",
            de: "witzig",
          },
          value: "witty",
        },
        {
          label: {
            "en-US": "sarcastic",
            es: "sarc\u00e1stico",
            de: "sarkastisch",
          },
          value: "sarcastic",
        },
        {
          label: {
            "en-US": "engaging",
            es: "atractivo",
            de: "fesselnd",
          },
          value: "engaging",
        },
        {
          label: {
            "en-US": "creative",
            es: "creativo",
            de: "kreativ",
          },
          value: "creative",
        },
      ],
    },
    translationsFormField,
  ];
}
