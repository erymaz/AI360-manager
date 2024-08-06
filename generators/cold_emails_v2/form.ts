import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "You",
        es: "T\u00fa",
        de: "Sie",
      },
      value: "",
      name: "you",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Please, write here your name or company's name",
        es: "wAIpify",
        de: "Bitte schreiben Sie hier Ihren Namen oder den Namen Ihres Unternehmens",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "To",
        es: "A",
        de: "Empfänger",
      },
      value: "",
      name: "to",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Please, write here the recipient name or a nickname",
        es: "Jack Doe",
        de: "Bitte schreiben Sie hier den Namen des Empfängers oder einen Spitznamen",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Goal",
        es: "Meta",
        de: "Ziel",
      },
      value: "",
      name: "goal",
      maxLength: 400,
      required: true,
      placeholder: {
        "en-US": "Example. Following up on an email we sent earlier",
        es: "Seguimiento de un correo electr\u00f3nico que enviamos anteriormente",
        de: "Beispiel: Im Anschluss an eine E-Mail, die wir zuvor gesendet haben",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Scenario",
        es: "Gui\u00f3n",
        de: "Szenario",
      },
      value: "",
      name: "scenario",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "Please, write something similar to this example: we sent an email to Jack a week before asking him to try out our writing tools. haven't heard back from him. Send him a follow up email reminding him of how wAIpify can help with his business and writing.",
        es: "Le enviamos un correo electr\u00f3nico a Jack una semana antes de pedirle que probara nuestras herramientas de escritura. no he tenido noticias suyas. Env\u00edele un correo electr\u00f3nico de seguimiento record\u00e1ndole c\u00f3mo wAIpify puede ayudarlo con su negocio y su escritura.",
        "de":
          "Schreiben Sie etwas Ähnliches wie dieses Beispiel: Eine Woche bevor wir ihn baten, unsere Schreibwerkzeuge auszuprobieren, schickten wir eine E-Mail an Jack. habe nichts von ihm geh\u00f6rt. Senden Sie ihm eine Folge-E-Mail, in der Sie ihn daran erinnern, wie wAIpify ihm bei seinem Gesch\u00e4ft und beim Schreiben helfen kann.",
      },
    },
    translationsFormField,
  ];
}
