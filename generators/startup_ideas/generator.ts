import { metaData } from "./main";
import { translateTextBatch } from "@/sdk/utils";
import { writesonic_api } from "@/sdk/writesonic/writesonic_api";

const PARAM = {
  name: "startup-ideas",
};

export async function run(formData: Record<string, any>) {
  const data = await writesonic_api(formData, PARAM);
  if (!Array.isArray(data)) {
    if ('detail' in data) {
      return [{
        locale: "en-US",
        contentType: "text",
        result: { body: data["detail"] },
      }];
    }
    else throw new Error('Unexpected writesonic_api return format!');
  }
  const locales: string[] = formData.translations.map((locale: string) => locale.trim());
  const translationsPromises = locales.map(async (locale) => {
    const bodyPromises = Object.entries(data[0]).map(async ([key, value]) => {
      const translation = await translateTextBatch(value as string, [locale], formData.locale);
      const obj: { value: string, name?: string } = { value: translation[0][1].trim() }
      if (Object.keys(data[0]).length > 1) obj.name = key;
      return obj;
    });
    const body = await Promise.all(bodyPromises);
    return {
      locale: locale,
      contentType: metaData().contentType,
      result: { body },
    };
  });
  const translations = await Promise.all(translationsPromises);
  return translations;
}
