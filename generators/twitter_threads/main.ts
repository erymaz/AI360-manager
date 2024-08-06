export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "twitter_threads",
    title: {
      "en-US": "Twitter Threads",
      es: "Hilos de Twitter",
      de: "Twitter-Threads",
    },
    image: "twitter",
    description: {
      "en-US":
        "Create a series of tweets that tell a story and prompt readers to start a conversation. Adapt any content to Twitter threads format.",
      es: "Cree una serie de tuits que cuenten una historia e inciten a los lectores a iniciar una conversación. Adapta cualquier contenido al formato de los hilos de Twitter.",
      de:
        "Erstellen Sie eine Reihe von Tweets, die eine Geschichte erzählen und die Leser auffordern, eine Unterhaltung zu beginnen. Passen Sie beliebige Inhalte an das Format von Twitter-Threads an.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
