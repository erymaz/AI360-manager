export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "emails",
    title: {
      "en-US": "Emails",
      es: "Correos electrónicos",
      de: "E-Mails",
    },
    image: "emails",
    description: {
      "en-US":
        "Professional-looking emails that help you engage leads and customers.",
      es: "Correos electrónicos de aspecto profesional que lo ayudan a captar clientes potenciales y clientes.",
      "de":
        "Professionell aussehende E-Mails, die Ihnen helfen, Leads und Kunden anzusprechen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
