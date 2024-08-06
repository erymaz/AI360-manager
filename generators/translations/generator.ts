import { metaData } from "./main";
import { translateTextBatch } from "@/sdk/utils";

export async function run(formData: Record<string, any>) {
  if (formData.product_description.trim() === '' || formData.translations.length === 0) {
    console.error("Empty fields in Translations Generator!");
    return;
  }

  const text = formData.product_description;

  // Return translated results
  const locales = formData.translations.map((locale: string) => locale.trim());
  const messages = await translateTextBatch(text, locales, "");
  return messages.map(([locale, translation]) => ({
    locale: locale,
    contentType: metaData().contentType,
    result: { body: translation },
  }));
}
