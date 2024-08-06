import { metaData } from "./main";
import { getFormSchema } from "./form";
import { translateTextBatch } from "@/sdk/utils";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";
import { getRegion } from "@/sdk/real_estate/location";
import { run as locationRun } from "@/sdk/real_estate/generator";
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
  5: 0.7,
};

const sectionGroups = [
  ["address", "community_name", "community_description"],
  ["number_homes", "gated_community", "community_type", "school_district"],
  ["number_bedrooms", "number_bathrooms", "area_sqft", "amenities"],
  [
    "distance_shopping",
    "distance_dining",
    "proximity_transportation",
    "near_park",
    "is_hoa",
    "garage_included",
    "parking_available",
    "nearby_facilities",
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
  let prompt = `Write a listing description for real estate new builds project. It should describe the features in a clear and informative manner, while also using emotive language to create a sense of exclusivity and prestige.

The task is to craft a detailed listing description for real estate new builds project having ${
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
  if (formData.dont_show_exact_address) {
    const approxAddress = await getRegion(formData.address);
    formData.address = approxAddress;
  }
  const formSchema = getFormSchema();
  const prompt = buildPrompt(formData, formSchema);
  const textPromise = gpt_api(prompt, PARAM);
  const locationDescPromise = locationRun(formData);
  const [text, locationDesc] = await Promise.all([
    textPromise,
    locationDescPromise,
  ]);
  const locales = formData.translations.map((locale: string) => locale.trim());
  const messages = await translateTextBatch(text, locales, formData.locale);
  return messages.map(([locale, translation]) => {
    const location = locationDesc.find((loc) => loc.locale === locale);
    return {
      locale: locale,
      contentType: metaData().contentType,
      result: {
        body: [{ value: translation }, location?.result.body].filter(Boolean),
      },
    };
  });
}
