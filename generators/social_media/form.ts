import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Social Media Site",
        es: "Sitio de Redes Sociales",
        de: "Social Media Seite",
      },
      name: "social_media_site",
      options: [
        {
          label: "Facebook",
          value: "facebook",
        },
        {
          label: "Instagram",
          value: "instagram",
        },
        {
          label: "Twitter",
          value: "twitter",
        },
        {
          label: "Linkedin",
          value: "linkedin",
        },
      ],
      value: "facebook",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Product Description Text",
        es: "Texto de Descripción del Producto",
        de: "Produktbeschreibungstext",
      },
      placeholder: {
        "en-US": "Enter text here",
        es: "Ingrese texto aquí",
        de: "Text hier eingeben",
      },
      name: "product_description",
      value: "",
      maxLength: 8000,
      required: true,
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Story Style",
        es: "Estilo de Historia",
        de: "Geschichtenstil",
      },
      name: "story_style",
      options: [
        {
          label: {
            "en-US": "Single paragraph (short)",
            es: "Un solo párrafo (corto)",
            de: "Ein einziger Absatz (kurz)",
          },
          value: "single_paragraph",
        },
        {
          label: {
            "en-US": "Just bullet points (short)",
            es: "Sólo puntos importantes (corto)",
            de: "Nur Stichpunkte (kurz)",
          },
          value: "bullets",
        },
        {
          label: {
            "en-US": "Paragraph with bullet points (detailed)",
            es: "Párrafo con puntos importantes (detallado)",
            de: "Absatz mit Stichpunkten (detailliert)",
          },
          value: "paragraph_with_bullets",
        },
        {
          label: {
            "en-US": "Several paragraphs (rich and detailed)",
            es: "Varios párrafos (rico y detallado)",
            de: "Mehrere Absätze (reich und detailliert)",
          },
          value: "several_paragraphs",
        },
      ],
      value: "single_paragraph",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Tone of voice",
        es: "Tono de voz",
        de: "Tonfall",
      },
      name: "tone",
      options: [
        {
          label: {
            "en-US": "Friendly",
            es: "Amistoso",
            de: "Freundlich",
          },
          value: "friendly",
        },
        {
          label: {
            "en-US": "Formal",
            es: "Formal",
            de: "Formell",
          },
          value: "formal",
        },
        {
          label: {
            "en-US": "Casual",
            es: "Informal",
            de: "Lässig",
          },
          value: "casual",
        },
        {
          label: {
            "en-US": "Optimistic",
            es: "Optimista",
            de: "Optimistisch",
          },
          value: "optimistic",
        },
        {
          label: {
            "en-US": "Pessimistic",
            es: "Pesimista",
            de: "Pessimistisch",
          },
          value: "pessimistic",
        },
        {
          label: {
            "en-US": "Assertive",
            es: "Asertivo",
            de: "Bestimmt",
          },
          value: "assertive",
        },
        {
          label: {
            "en-US": "Encouraging",
            es: "Alentador",
            de: "Ermutigend",
          },
          value: "encouraging",
        },
        {
          label: {
            "en-US": "Excited",
            es: "Emocionado",
            de: "Aufgeregt",
          },
          value: "excited",
        },
      ],
      value: "friendly",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Enter hashtags (as words separated by commas)",
        es: "Ingrese hashtags (como palabras separadas por comas)",
        de: "Geben Sie Hashtags ein (als durch Kommas getrennte Wörter)",
      },
      placeholder: "#hashtag",
      name: "hashtags",
      value: "",
      maxLength: 500,
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Add Additional Image",
        es: "Agregar Imagen Adicional",
        de: "Zusätzliches Bild hinzufügen",
      },
      name: "additional_image",
    },
    translationsFormField,
  ];
}
