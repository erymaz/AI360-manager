import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Video Topic",
        es: "Tema de v\u00eddeo",
        de: "Videothema",
      },
      value: "",
      name: "video_topic",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "AI in real life",
        es: "IA en la vida real",
        de: "KI im wirklichen Leben",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Search Term",
        es: "T\u00e9rmino de b\u00fasqueda",
        de: "Suchbegriff",
      },
      value: "",
      name: "search_term",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "artificial intelligence",
        es: "inteligencia artificial",
        de: "k\u00fcnstliche Intelligenz",
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
