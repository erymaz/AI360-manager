import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Paragraph",
        es: "P\u00e1rrafo",
        de: "Absatz",
      },
      value: "",
      name: "paragraph",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "The combination of AI and human intelligence will lead to the development of sophisticated cybersecurity innovations in the future. AI will enable an efficient battle against the rising cyberattacks and crimes. AI has a lot to offer to the transportation and manufacturing sectors.",
        es: "La combinaci\u00f3n de IA e inteligencia humana conducir\u00e1 al desarrollo de innovaciones sofisticadas de ciberseguridad en el futuro. La IA permitir\u00e1 una batalla eficiente contra los crecientes ciberataques y delitos. AI tiene mucho que ofrecer a los sectores de transporte y fabricaci\u00f3n.",
        "de":
          "Die Kombination von KI und menschlicher Intelligenz wird in Zukunft zur Entwicklung anspruchsvoller Cybersicherheitsinnovationen f\u00fchren. KI wird einen effizienten Kampf gegen die zunehmenden Cyberangriffe und -kriminalit\u00e4t erm\u00f6glichen. KI hat dem Transport- und Fertigungssektor viel zu bieten.",
      },
    },
    translationsFormField,
  ];
}
