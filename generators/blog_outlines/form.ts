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
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Blog Intro",
        es: "Introducci\u00f3n al blog",
        de: "Blog-Einf\u00fchrung",
      },
      value: "",
      name: "blog_intro",
      maxLength: 1500,
      required: true,
      placeholder: {
        "en-US":
          "The possibilities of artificial intelligence (AI) seem endless. It\u2019s predicted that AI will soon have the ability to write articles, screen movies, and even drive cars on our behalf. But what about copywriting? Can AI be the next copywriter? I\u2019ve spent the past few weeks doing some research and experimenting, and I\u2019ve come up with a few ideas for how AI will change the world of copywriting.",
        es: "Las posibilidades de la inteligencia artificial (IA) parecen infinitas. Se predice que la IA pronto tendr\u00e1 la capacidad de escribir art\u00edculos, proyectar pel\u00edculas e incluso conducir autom\u00f3viles en nuestro nombre. Pero \u00bfqu\u00e9 pasa con la redacci\u00f3n? \u00bfPuede AI ser el pr\u00f3ximo redactor? Pas\u00e9 las \u00faltimas semanas investigando y experimentando, y se me ocurrieron algunas ideas sobre c\u00f3mo la IA cambiar\u00e1 el mundo de la redacci\u00f3n publicitaria.",
        "de":
          "Die M\u00f6glichkeiten der k\u00fcnstlichen Intelligenz (KI) scheinen endlos. Es wird vorhergesagt, dass KI bald in der Lage sein wird, in unserem Namen Artikel zu schreiben, Filme zu zeigen und sogar Autos zu fahren. Aber was ist mit dem Verfassen von Texten? Kann KI der n\u00e4chste Texter sein? Ich habe die letzten Wochen damit verbracht, etwas zu recherchieren und zu experimentieren, und mir sind ein paar Ideen eingefallen, wie KI die Welt des Textens ver\u00e4ndern wird.",
      },
    },
    translationsFormField,
  ];
}
