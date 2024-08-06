export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "office_space_for_rent",
    title: {
      "en-US": "Create a High Quality Office Space Listing Description in a Flash",
      es: "Cree una description de un espacio de oficina en alquiler en segundos",
      de: "Erstellen Sie ein hochwertiges Exposé für Büroflächen im Überblick mit KI",
    },
    image: "office_space_for_rent",
    description: {
      "en-US": "Attract tenants with high-quality office space listing. Specify visibility, access to the offices, facilities, and possibilities of use and generate a listing in seconds.",
      es: "Cree un anuncio de espacio de oficinas que atraiga el interés de los inquilinos. Especifique la visibilidad, el acceso a las oficinas, las instalaciones y las posibilidades de uso y genere un listado en segundos.",
      de: "Ziehen Sie Mieter mit einem hochwertigen Exposé für Büroflächen an. Geben Sie Sichtbarkeit, Zugang zu den Büros, Einrichtungen und Nutzungsmöglichkeiten an und erstellen Sie in Sekundenschnelle ein Angebot.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 250,
    promoted: 0,
    popularity: 1,
  };
}
