export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "instant_article_writer",
    title: {
      "en-US": "Instant Article Writer",
      es: "Escritor de artículos instantáneos",
      de: "Instant-Artikel-Autor",
    },
    image: "instant_article_writer",
    description: {
      "en-US":
        "Instantly generate 1500-word articles with one click. This is an automated process, so your title must be very precise.",
      es: "Genere instantáneamente artículos de 1500 palabras con un solo clic. Este es un proceso automatizado, por lo que su título debe ser muy preciso.",
      "de":
        "Generieren Sie sofort Artikel mit 1500 Wörtern mit einem Klick. Da es sich um einen automatisierten Prozess handelt, muss Ihr Titel sehr präzise sein.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
