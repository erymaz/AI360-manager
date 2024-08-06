import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Blog Title",
        es: "Titulo de Blog",
        de: "Blog Titel",
      },
      value: "",
      name: "blog_title",
      maxLength: 200,
      required: true,
      placeholder: {
        "en-US":
          "How Artificial Intelligence Will Change The World Of Copywriting",
        es: "C\u00f3mo la inteligencia artificial cambiar\u00e1 el mundo de la redacci\u00f3n publicitaria",
        "de":
          "Wie k\u00fcnstliche Intelligenz die Welt des Copywritings ver\u00e4ndern wird",
      },
    },
    translationsFormField,
  ];
}
