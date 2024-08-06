export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "cold_emails_v2",
    title: {
      "en-US": "Write Personalized Emails to Your Target Prospects with Ease with AI",
      es: "Correos electrónicos a puerta fria",
      de: "Erstellen Sie eine Kaltakquise E-Mail mit KI",
    },
    image: "cold_emails_v2",
    description: {
      "en-US":
        "Write Personalized emails to your target prospects that get better results.",
      es: "Alcance de correo electrónico personalizado a sus prospectos objetivo que obtienen mejores resultados.",
      "de":
        "Personalisierte E-Mail-Kontaktaufnahme mit Ihren Zielinteressenten, die bessere Ergebnisse erzielen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 30,
    promoted: 0,
    popularity: 1,
  };
}
