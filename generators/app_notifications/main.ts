export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "app_notifications",
    title: {
      "en-US": "App and SMS Notifications",
      es: "Notificaciones de aplicaciones y SMS",
      de: "App- und SMS-Benachrichtigungen",
    },
    image: "app_notifications",
    description: {
      "en-US":
        "Notification messages for your apps, websites, and mobile devices that keep users coming back for more.",
      es: "Mensajes de notificación para sus aplicaciones, sitios web y dispositivos móviles que hacen que los usuarios regresen por más.",
      "de":
        "Benachrichtigungsnachrichten für Ihre Apps, Websites und Mobilgeräte, die dafür sorgen, dass Benutzer immer wieder zurückkommen, um mehr zu erfahren.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
