export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "company_mission",
    title: {
      "en-US": "Company Mission",
      es: "Misión de la empresa",
      de: "Unternehmensmission",
    },
    image: "company_mission",
    description: {
      "en-US":
        "A clear and concise statement of your company's goals and purpose.",
      es: "Una declaración clara y concisa de los objetivos y el propósito de su empresa.",
      "de":
        "Eine klare und prägnante Darstellung der Ziele und des Zwecks Ihres Unternehmens.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
