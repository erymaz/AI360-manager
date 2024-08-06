export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "sentence_expand",
    title: {
      "en-US": "Sentence Expander",
      es: "Expansor de oraciones",
      de: "Satzerweiterung",
    },
    image: "sentence_expand",
    description: {
      "en-US":
        "Expand short sentences into more descriptive and interesting ones.",
      es: "Expande oraciones cortas en otras más descriptivas e interesantes.",
      "de":
        "Erweitern Sie kurze Sätze zu aussagekräftigeren und interessanteren Sätzen.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
