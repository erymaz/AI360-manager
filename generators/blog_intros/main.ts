export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "blog_intros",
    title: {
      "en-US": "Informative AI Article Intros",
      es: "Intros de artículos informativos sobre IA",
      de: "Informative AI-Artikel-Intros",
    },
    image: "blog",
    description: {
      "en-US": "Capture the audience's interest right away with an exciting article/blog introduction. Outline main article points and give an overview of chapters.",
      es: "Capte de inmediato el interés de la audiencia con una introducción atractiva para el artículo o el blog. Resuma los puntos principales del artículo y ofrezca una visión general de los capítulos.",
      de:
        "Wecken Sie das Interesse des Publikums sofort mit einer spannenden Artikel-/Blog-Einleitung. Skizzieren Sie die wichtigsten Punkte des Artikels und geben Sie einen Überblick über die einzelnen Kapitel.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
