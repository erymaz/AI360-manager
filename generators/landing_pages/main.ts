export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "landing_pages",
    title: {
      "en-US": "Create High Converting Landing Pages with AI Help",
      es: "Páginas de destino",
      de: "Erstellen Sie hoch konvertierende Landingpages mit KI-Hilfe",
    },
    image: "landing_pages",
    description: {
      "en-US":
        "Tailored high-converting landing page copies that drive more leads, sales, and signups.",
      es: "Copias personalizadas de la página de destino de alta conversión que generan más clientes potenciales, ventas y suscripciones.",
      "de":
        "Schreiben Sie maßgeschneiderte, hochkonvertierende Landingpage-Texten, die mehr Leads, Verkäufe und Anmeldungen generieren.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 150,
    promoted: 0,
    popularity: 2,
  };
}
