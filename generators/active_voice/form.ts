import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Sentence",
        es: "Oraci\u00f3n",
        de: "Satz",
      },
      value: "",
      name: "sentence",
      maxLength: 1000,
      required: true,
      placeholder: {
        "en-US":
          "The contract was cancelled by the studio managers. Hidden behind their stoic lawyers the messages were passed down. Words like \u2018iron clad\u2019 and \u2018final notice\u2019 were thrust into their faces. Voices were raised. Emotions were not kept in check. Fury rose unbridled.",
        es: "El contrato fue cancelado por los gerentes del estudio. Escondidos detr\u00e1s de sus estoicos abogados, los mensajes fueron transmitidos. Palabras como 'revestido de hierro' y 'aviso final' fueron arrojadas a sus rostros. Se alzaron voces. Las emociones no se mantuvieron bajo control. La furia se elev\u00f3 desenfrenada.",
        "de":
          "Der Vertrag wurde von den Studiomanagern gek\u00fcndigt. Verborgen hinter ihren stoischen Anw\u00e4lten wurden die Botschaften weitergegeben. Worte wie \u201eeisern gepanzert\u201c und \u201eletzte Mitteilung\u201c wurden ihnen ins Gesicht gedr\u00e4ngt. Stimmen wurden laut. Die Emotionen wurden nicht unter Kontrolle gehalten. Die Wut stieg ungez\u00fcgelt auf.",
      },
    },
    translationsFormField,
  ];
}
