import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Content To Shorten",
        es: "Contenido para acortar",
        de: "Inhalt zum K\u00fcrzen",
      },
      value: "",
      name: "content_to_shorten",
      maxLength: 1000,
      required: true,
      placeholder: {
        "en-US":
          "We're pretty sure we found the key to achieving nirvana, and it starts with this fresh, delicate mix of white and green tea.",
        es: "Estamos bastante seguros de que encontramos la clave para alcanzar el nirvana, y comienza con esta mezcla fresca y delicada de t\u00e9 blanco y verde.",
        "de":
          "Wir sind uns ziemlich sicher, dass wir den Schl\u00fcssel zum Erreichen des Nirvana gefunden haben, und der beginnt mit dieser frischen, delikaten Mischung aus wei\u00dfem und gr\u00fcnem Tee.",
      },
    },
    translationsFormField,
  ];
}
