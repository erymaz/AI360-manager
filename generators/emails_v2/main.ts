export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "emails_v2",
    title: {
      "en-US": "Write Engaging Emails without Effort with AI",
      es: "Correos electrónicos V2",
      de: "Schreiben Sie mühelos ansprechende E-Mails mit KI",
    },
    image: "emails_v2",
    description: {
      "en-US":
        "With this generator you will write professional-looking emails that help you engage with leads and customers. Without effort.",
      es: "Correos electrónicos de aspecto profesional que lo ayudan a atraer clientes potenciales y clientes.",
      "de":
        "Schreiben Sie professionell aussehende E-Mails, die Ihnen helfen, Leads und Kunden anzusprechen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
