import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Name",
        es: "Nombre",
        de: "Name",
      },
      value: "",
      name: "name",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Elon Musk",
        es: "Elon Musk",
        de: "Elon Musk",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Personal Info",
        es: "Informaci\u00f3n personal",
        de: "Pers\u00f6nliche Informationen",
      },
      value: "",
      name: "personal_info",
      maxLength: 300,
      required: true,
      placeholder: {
        "en-US":
          "Co-founder of PayPal and Tesla. Founder of SpaceX, Neuralink, and The Boring Company. Born and raised in South Africa. Graduated from University of Pennsylvania in physics.",
        es: "Co-fundador de PayPal y Tesla. Fundador de SpaceX, Neuralink y The Boring Company. Nacido y criado en Sud\u00e1frica. Graduado de la Universidad de Pensilvania en f\u00edsica.",
        "de":
          "Mitbegr\u00fcnder von PayPal und Tesla. Gr\u00fcnder von SpaceX, Neuralink und The Boring Company. Geboren und aufgewachsen in S\u00fcdafrika. Abschluss in Physik an der University of Pennsylvania.",
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
