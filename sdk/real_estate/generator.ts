import { getRegion, printLocationPOI } from "./location";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";
import { augmentLabelMap, translateTextBatch } from "@/sdk/utils";

const PARAM = {
  model: "gpt-35-turbo",
  system_message: "",
  temperature: 0.7,
  max_tokens: 2000,
  top_p: 1.0,
};

const locationLocalizations: Record<string, string> = {
  "en-US": "Location",
  es: "Ubicación",
  de: "Lage",
};

export const buildPrompt = (
  address: string,
  no_exact_address: string,
  places: string,
  locale: string,
) => {
  let prompt = `
Write a comprehensive overview of the neighborhood around ${address}. ${no_exact_address}

Your overview should highlight the following:
The city and district where the location is situated, and any unique features or characteristics of the area that make it stand out.
The local culture, people, and history of the area, including any notable historical events or landmarks.
Tourist attractions and landmarks within walking or driving distance of the location, and any notable natural landscapes or scenic views in the area.
Dining, shopping, and leisure options in the area, including any notable restaurants, cafes, or shopping malls.
Housing options and population demographics in the area, including any notable residential developments or housing trends.
Public transportation options in the area, including any major highway, bus, train, or metro stations nearby, as well as access to the largest airport.
The estimated driving or walking time in minutes to reach each of the following nearby points of interest, as well as the distance from each POI to the location:
${places}
Using the information provided above, please generate a detailed and informative overview of the neighborhood, spanning between 1500 to 2000 characters. Try to utilize the distance or travel time information provided in a natural and coherent way, use your own judgement to incorporate information from the POI list where it fits naturally. Avoid always mentioning distance followed by travel time, use some variations. Avoid listing POIs one by one, and instead focus on providing a natural description and conclusion to the overview. Describe the main airport and its drive time to this location. Do not describe airport that has been closed and has ceased operations. For example, describe Brandenburg for Berlin; do not describe Tegel and Tempelhof for Berlin because they have been closed and ceased operations. ${no_exact_address}
`;
  prompt += locale !== "en-US" ? `\nWrite in ${languageMap[locale]}.` : "";

  return prompt;
};

export async function run(formData: Record<string, any>) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GOOGLE_MAPS_API_KEY is not defined in the environment variables",
    );
  }

  // Get place POI details
  let address = formData.address;
  const places = await printLocationPOI(address, apiKey);

  // The "don't show exact address" logic
  const dont_show_exact_address = formData.dont_show_exact_address;
  let no_exact_address = "";
  if (
    typeof dont_show_exact_address !== "undefined" &&
    dont_show_exact_address === true
  ) {
    address = await getRegion(address);
    no_exact_address =
      "Refer to this address by its district or the region where it is located. You shall not write the full address.";
  }

  // Compose prompt and get GPT response message
  const locale = formData.locale;
  const prompt = buildPrompt(address, no_exact_address, places, locale);
  const text = await gpt_api(prompt, PARAM);

  // Return translated results
  const locales = formData.translations.map((locale: string) => locale.trim());
  await augmentLabelMap(locationLocalizations, locales);
  const messages = await translateTextBatch(text, locales, formData.locale);
  return messages.map(([locale, translation]) => ({
    locale: locale,
    contentType: "text",
    result: {
      body: { name: locationLocalizations[locale], value: translation },
    },
  }));
}
