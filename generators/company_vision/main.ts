export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "company_vision",
    title: {
      "en-US": "Company Vision",
      es: "Visión de la empresa",
      de: "Unternehmensvision",
    },
    image: "company_vision",
    description: {
      "en-US":
        "A vision that attracts the right people, clients, and employees.",
      es: "Una visión que atrae a las personas, clientes y empleados adecuados.",
      "de":
        "Eine Vision, die die richtigen Leute, Kunden und Mitarbeiter anzieht.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
