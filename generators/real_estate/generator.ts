import { metaData } from "./main";
import { getFormSchema } from "./form";
import { translateTextBatch } from "@/sdk/utils";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";
import { getRegion } from "@/sdk/real_estate/location";
import { getTonePrompt } from "@/sdk/real_estate/tone";
import { run as locationRun } from "@/sdk/real_estate/generator";
import { buildPropertyDetailFromForm } from "@/sdk/real_estate/paragraph";

const PARAM = {
  model: "gpt-35-turbo",
  system_message: "You are a real estate marketing expert.",
  temperature: 0,
  top_p: 1.0,
};

const temperatureTable: { [key: number]: number } = {
  3: 0,
  4: 0.7,
  5: 0.8,
  6: 0.9,
  7: 1.0,
  8: 1.0,
};

const sectionGroups = [
  [
    "property_for",
    "property_type",
    "building_condition",
    "tone",
    "year_of_construction",
  ],
  [
    "sq_meter",
    "number_floors",
    "apartment_floor",
    "number_rooms",
    "number_bathrooms",
    "number_living_rooms",
    "living_room_areas",
    "living_room_style",
    "storage_mts",
    "number_parking_lots",
    "number_terrace",
    "number_balconies",
    "garden_size",
  ],
  ["year_of_renovation", "what_was_renovated"],
  [
    "has_monument_protection",
    "has_hallway",
    "has_high_ceilings",
    "has_elevator",
    "has_swimming_pool",
    "has_basement",
    "kitchen_type",
    "kitchen_style",
    "window_types",
    "daylight",
    "type_of_views",
    "quality_of_views",
    "orientation",
    "number_of_chimneys",
    "highlights",
  ],
  ["address"],
  [
    "energy_certificate",
    "energy_certificate_validity_till",
    "heating_type",
    "energy_efficiency_class",
    "essential_energy_source",
    "final_energy_consumption",
    "year_of_construction_according_to_certificate",
  ],
  ["occupation_status", "purchase_price", "price_per_sqm", "parking_price"],
  ["property_is_ideal_for"],
];

export const buildPrompt = (
  formData: Record<string, any>,
  formSchema: Record<string, any>[],
) => {
  const tonePrompt = getTonePrompt(formData.tone, formData.locale, formSchema);
  const [productSpec, paragraphCount] = buildPropertyDetailFromForm(
    formData,
    formSchema,
    sectionGroups,
  ) as [string, number];
  PARAM.temperature = temperatureTable[paragraphCount - 1] || 0;
  let prompt = `Write a property listing description that incorporates a unique combination of the writing styles from the leading real estate brokerage companies in Germany. The post SHALL NOT MENTION any specific company names. The post should describe the property's features in a clear and informative manner, while also using emotive language to create a sense of exclusivity and prestige.

${tonePrompt}

You SHALL NOT copy numbers and specific features from the example. You can only learn from its writing style.

The task is to craft a property listing title, followed by a detailed description having ${
    paragraphCount - 1
  } paragraphs:\n\n`;
  prompt += productSpec.slice(0, 20000 - prompt.length);
  prompt += `\n\nAvoid using "Title:" and "Description:" labels.\nIt is important to write exactly ${
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
