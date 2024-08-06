import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Blog Description",
        es: "Descripci\u00f3n del blog",
        de: "Blog-Beschreibung",
      },
      value: "",
      name: "blog_description",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Your personal brand is your reputation and how people perceive you. What you say and do is part of the brand. Your brand identity is the sum of your personal brand and the perception of your company. It helps people understand who you are and what you have to offer. But how do you build a strong brand identity?Here are four steps to help you do that.",
        es: "Tu marca personal es tu reputaci\u00f3n y c\u00f3mo te percibe la gente. Lo que dices y haces es parte de la marca. Tu identidad de marca es la suma de tu marca personal y la percepci\u00f3n de tu empresa. Ayuda a las personas a entender qui\u00e9n eres y qu\u00e9 tienes para ofrecer. Pero, \u00bfc\u00f3mo se construye una identidad de marca s\u00f3lida? Aqu\u00ed hay cuatro pasos para ayudarlo a hacerlo.",
        "de":
          "Ihre pers\u00f6nliche Marke ist Ihr Ruf und wie die Leute Sie wahrnehmen. Was Sie sagen und tun, ist Teil der Marke. Ihre Markenidentit\u00e4t ist die Summe Ihrer pers\u00f6nlichen Marke und der Wahrnehmung Ihres Unternehmens. Es hilft den Menschen zu verstehen, wer Sie sind und was Sie zu bieten haben. Aber wie baut man eine starke Markenidentit\u00e4t auf? Hier sind vier Schritte, die Ihnen dabei helfen.",
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
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "How to build a personal brand",
        es: "C\u00f3mo construir una marca personal",
        de: "Wie man eine pers\u00f6nliche Marke aufbaut",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Blog Title",
        es: "Titulo de Blog",
        de: "Blog Titel",
      },
      value: "",
      name: "blog_title",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "The 4 Steps To Building A Strong Personal Brand Identity",
        es: "Los 4 pasos para construir una fuerte identidad de marca personal",
        "de":
          "Die 4 Schritte zum Aufbau einer starken pers\u00f6nlichen Markenidentit\u00e4t",
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
    },
    translationsFormField,
  ];
}
