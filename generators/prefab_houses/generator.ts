import { metaData } from "./main";
import { getFormSchema } from "./form";
import { translateTextBatch } from "@/sdk/utils";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";
import { buildPropertyDetailFromForm } from "@/sdk/real_estate/paragraph";

const PARAM = {
  model: "gpt-35-turbo",
  system_message: "You are a real estate marketing expert.",
  temperature: 0,
  top_p: 1.0,
};

const temperatureTable: { [key: number]: number } = {
  1: 0,
  2: 0,
  3: 0.7,
  4: 0.7,
};

const sectionGroups = [
  ["house_model", "house_type", "construction_type", "total_area", "roof_type"],
  [
    "interior_size",
    "number_bedrooms",
    "number_bathrooms",
    "include_backyard",
    "include_garage",
    "has_attic",
    "architectural_components",
    "description",
  ],
  [
    "energy_standard",
    "completion_stage",
    "price",
    "location",
    "satisfaction_rate",
    "quality_construction",
  ],
  ["additional_info"],
];

export const buildPrompt = (
  formData: Record<string, any>,
  formSchema: Record<string, any>[],
) => {
  const [productSpec, paragraphCount] = buildPropertyDetailFromForm(
    formData,
    formSchema,
    sectionGroups,
  ) as [string, number];
  PARAM.temperature = temperatureTable[paragraphCount - 1] || 0;
  let prompt = `Write a listing description for prefabricated homes. It should describe the features in a clear and informative manner, while also using emotive language to create a sense of exclusivity and prestige.

The task is to craft a detailed listing description for prefabricated homes having ${
    paragraphCount - 1
  } paragraphs:\n\n`;
  prompt += productSpec.slice(0, 20000 - prompt.length);
  prompt += `\n\nAvoid using paragraph titles such as "Paragraph 1:".\nIt is important to write exactly ${
    paragraphCount - 1
  } paragraphs with the exact provided features.`;
  prompt += `\nWrite in ${languageMap[formData.locale]}.`;
  return prompt;
};

export async function run(formData: Record<string, any>) {
  const formSchema = getFormSchema();
  const prompt = buildPrompt(formData, formSchema);
  const text = await gpt_api(prompt, PARAM);
  const locales = formData.translations.map((locale: string) => locale.trim());
  const messages = await translateTextBatch(text, locales, formData.locale);
  return messages.map(([locale, translation]) => ({
    locale: locale,
    contentType: metaData().contentType,
    result: { body: translation },
  }));
}
