import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Description",
        es: "Descripci\u00f3n",
        de: "Beschreibung",
      },
      value: "",
      name: "description",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Robert Bruce was the king of Scotland, who was at war with England. Scotland lost all 6 battles against England. One day, a disheartened Robert sees a spider trying to weave her web but failing again and again. Seeing the spider's perseverance, Robert feels motivated again.",
        es: "Robert Bruce era el rey de Escocia, que estaba en guerra con Inglaterra. Escocia perdi\u00f3 las 6 batallas contra Inglaterra. Un d\u00eda, Robert, desanimado, ve a una ara\u00f1a tratando de tejer su tela pero fallando una y otra vez. Al ver la perseverancia de la ara\u00f1a, Robert vuelve a sentirse motivado.",
        "de":
          "Robert Bruce war der K\u00f6nig von Schottland, der sich im Krieg mit England befand. Schottland verlor alle 6 Schlachten gegen England. Eines Tages sieht der entmutigte Robert eine Spinne, die versucht, ihr Netz zu weben, aber immer wieder scheitert. Als Robert die Beharrlichkeit der Spinne sieht, f\u00fchlt er sich wieder motiviert.",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Tone Of Voice",
        es: "Tono de voz",
        de: "Tonfall",
      },
      value: "",
      name: "tone_of_voice",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Inspirational",
        es: "inspirador",
        de: "Inspirierend",
      },
    },
    translationsFormField,
  ];
}
