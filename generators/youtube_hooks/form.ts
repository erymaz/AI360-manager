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
        "en-US":
          "Launch of wAIpify\u2019s chrome extension that lets anyone rephrase, expand and shorten their content within seconds.",
        es: "Lanzamiento de la extensi\u00f3n de Chrome de wAIpify que permite reformular, expandir y acortar su contenido en segundos.",
        "de":
          "Einf\u00fchrung der Chrome-Erweiterung von wAIpify, mit der jeder seine Inhalte innerhalb von Sekunden umformulieren, erweitern und k\u00fcrzen kann.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Tone",
        es: "Tono",
        de: "Ton",
      },
      value: "",
      name: "tone",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "excited",
        es: "entusiasmado",
        de: "aufgeregt",
      },
    },
    translationsFormField,
  ];
}
