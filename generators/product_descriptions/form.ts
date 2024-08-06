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
        "en-US": "Buddha's Tea",
        es: "T\u00e9 de Buda",
        de: "Buddhas Tee",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product Characteristics",
        es: "Caracteristicas de producto",
        de: "Produkteigenschaften",
      },
      value: "",
      name: "product_characteristics",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Buddha\u2019s Blend Sachets are a fresh, delicate mix of white and green tea with jasmine pearls for a sweet floral perfume. Just sit back, relax and take a sip. Pure bliss.",
        es: "Los sobres de mezcla de Buda son una mezcla fresca y delicada de t\u00e9 blanco y verde con perlas de jazm\u00edn para un dulce perfume floral. Solo si\u00e9ntate, rel\u00e1jate y toma un sorbo. Pura felicidad.",
        "de":
          "Buddha\u2019s Blend Sachets sind eine frische, zarte Mischung aus wei\u00dfem und gr\u00fcnem Tee mit Jasminperlen f\u00fcr einen s\u00fc\u00dfen, blumigen Duft. Lehnen Sie sich einfach zur\u00fcck, entspannen Sie sich und nehmen Sie einen Schluck. Reine Gl\u00fcckseligkeit.",
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
      maxLength: 200,
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Secondary Keyword",
        es: "Palabra clave secundaria",
        de: "Sekund\u00e4res Schl\u00fcsselwort",
      },
      value: "",
      name: "secondary_keyword",
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
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Tone of voice",
        es: "Tono de voz",
        de: "Tonfall",
      },
      value: "excited",
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
