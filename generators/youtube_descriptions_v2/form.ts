import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
   {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Video Title",
        es: "Titulo del Video",
        de: "Videotitel",
      },
      value: "",
      name: "video_title",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US": "Please, write or paste here your video title",
        es: "C\u00f3mo pasar todas las noches - Elon Musk",
        de: "Bitte schreiben oder fügen Sie hier Ihren Videotitel ein",
      },
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
      maxLength: 150,
      required: true,
      placeholder: {
        "en-US": "Please, write here the keywords you want to address",
        es: "IA, lanzamiento, wAIpify",
        de: "Geben Sie hier die Schlüsselwörter ein, die Sie ansprechen möchten",
      },
    },
    translationsFormField,
  ];
}
