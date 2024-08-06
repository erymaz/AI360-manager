import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Article",
        es: "Art\u00edculo",
        de: "Artikel",
      },
      value: "",
      name: "article",
      maxLength: 6000,
      required: true,
      placeholder: {
        "en-US":
          "AI will be a big part of the future and will have a huge impact on our lives. Many companies are already investing in AI, and many other companies will follow suit. AI can automate many tasks that humans do, freeing up people to focus on other things. AI has the potential to be used for a variety of purposes, such as helping astronauts travel to Mars or automating financial transactions. While AI is still in its infancy, it holds a lot of promise for the future.\nIf you want to learn more about AI, check out some of these resources:\n-Artificial Intelligence by Peter Norvig:A book that discusses AI from a technical perspective.\n-What is Artificial Intelligence?:An article that provides an overview of AI.\n-Stanford University's Artificial Intelligence Page:A page with information about AI research at Stanford University",
        es: "La IA ser\u00e1 una gran parte del futuro y tendr\u00e1 un gran impacto en nuestras vidas. Muchas empresas ya est\u00e1n invirtiendo en IA y muchas otras seguir\u00e1n su ejemplo. La IA puede automatizar muchas tareas que realizan los humanos, liberando a las personas para que se concentren en otras cosas. La IA tiene el potencial de usarse para una variedad de prop\u00f3sitos, como ayudar a los astronautas a viajar a Marte o automatizar transacciones financieras. Si bien la IA a\u00fan est\u00e1 en su infancia, es muy prometedora para el futuro.\nSi desea obtener m\u00e1s informaci\u00f3n sobre la IA, consulte algunos de estos recursos:\n-Inteligencia artificial de Peter Norvig: un libro que analiza la IA desde una perspectiva t\u00e9cnica.\n-\u00bfQu\u00e9 es la Inteligencia Artificial?: Un art\u00edculo que proporciona una visi\u00f3n general de la IA.\n-P\u00e1gina de inteligencia artificial de la Universidad de Stanford: una p\u00e1gina con informaci\u00f3n sobre la investigaci\u00f3n de IA en la Universidad de Stanford",
        "de":
          "KI wird ein gro\u00dfer Teil der Zukunft sein und einen gro\u00dfen Einfluss auf unser Leben haben. Viele Unternehmen investieren bereits in KI und viele andere Unternehmen werden diesem Beispiel folgen. KI kann viele Aufgaben automatisieren, die Menschen erledigen, sodass sich die Menschen auf andere Dinge konzentrieren k\u00f6nnen. KI kann f\u00fcr vielf\u00e4ltige Zwecke eingesetzt werden, etwa um Astronauten bei der Reise zum Mars zu unterst\u00fctzen oder Finanztransaktionen zu automatisieren. Obwohl KI noch in den Kinderschuhen steckt, ist sie vielversprechend f\u00fcr die Zukunft.\nWenn Sie mehr \u00fcber KI erfahren m\u00f6chten, sehen Sie sich einige dieser Ressourcen an:\n-K\u00fcnstliche Intelligenz von Peter Norvig: Ein Buch, das KI aus technischer Sicht behandelt.\n-Was ist k\u00fcnstliche Intelligenz?: Ein Artikel, der einen \u00dcberblick \u00fcber KI bietet.\n-Seite zur k\u00fcnstlichen Intelligenz der Stanford University: Eine Seite mit Informationen \u00fcber die KI-Forschung an der Stanford University",
      },
    },
    translationsFormField,
  ];
}
