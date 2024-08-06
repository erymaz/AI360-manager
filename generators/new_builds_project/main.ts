export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "new_builds_project",
    title: {
      "en-US": "Create a New Build Project Description with Highlights and Location Details",
      es: "Crear una descripción de proyecto de nueva construcción con detalles destacados y de ubicación",
      de: "Erstellen Sie ein Exposé für Ihr Neubauprojekt mit allen wichtigen Details",
    },
    image: "new_builds_project",
    description: {
      "en-US": "A listing description for all available units of your new build project. Add data on units and generate an attention-grabbing description including highlights and location details.",
      es: "Una descripción de todas las unidades disponibles de su nuevo proyecto de construcción. Añada datos sobre las unidades y genere una descripción atractiva que incluya los aspectos más destacados y detalles sobre la ubicación.",
      de: "Eine Beschreibung für alle verfügbaren Einheiten Ihres Neubauprojekts. Fügen Sie Daten zu den Einheiten hinzu und erstellen Sie eine aufmerksamkeitsstarke Beschreibung mit Highlights und Standortdetails.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 300,
    promoted: 0,
    popularity: 1,
  };
}
