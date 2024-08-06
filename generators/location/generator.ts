import { metaData } from "./main";
import { printLocationPOI } from "./location";
import { augmentLabelMap, translateTextBatch } from "@/sdk/utils";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";
import { getRegion } from "@/sdk/real_estate/location";

const PARAM = {
  model: "gpt-35-turbo",
  system_message: "",
  temperature: 0.7,
  max_tokens: 2000,
  top_p: 1.0,
};

const googleMapLocalizations: Record<string, string> = {
  "en-US": "Google Map",
  es: "Mapa de Google",
  de: "Google Karte",
};

function humanizePoiString(inputString: string) {
  let inputLines = inputString.split("\n");
  let outputLines = inputLines.map((str) => {
    let closingBracketIndex = str.indexOf("]");
    if (closingBracketIndex === -1) return str;
    let category = str.substring(1, closingBracketIndex);
    category =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " ");
    return str.replace(/\[(.*?)\]/, "* [" + category + "]");
  });

  return outputLines.join("\n");
}

function indentText(text: string) {
  return text
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
}

export const buildPrompt = (
  address: string,
  no_exact_address: string,
  schoolPlaces: string,
  transportPlaces: string,
  otherPlaces: string,
  hasAirport: boolean,
  locale: string,
) => {
  let count = 4;
  let placesPrompt = "";
  if (schoolPlaces.trim() !== "") {
    placesPrompt += `Write a ${count}th paragraph to elaborate on schools. The estimated driving or walking time in minutes to reach each of the following nearby points of interest, as well as the distance from each POI to the location:\n${indentText(
      schoolPlaces,
    )}\n\n`;
    count += 1;
  }
  if (transportPlaces.trim() !== "") {
    placesPrompt += `Write a ${count}th paragraph to elaborate on public transportation. The estimated driving or walking time in minutes to reach each of the following nearby points of interest, as well as the distance from each POI to the location:\n${indentText(
      transportPlaces,
    )}\n\n`;
    count += 1;
  }
  if (otherPlaces.trim() !== "") {
    placesPrompt += `Write a ${count}th paragraph to elaborate on places and interests. The estimated driving or walking time in minutes to reach each of the following nearby points of interest, as well as the distance from each POI to the location:\n${indentText(
      otherPlaces,
    )}`;
    count += 1;
  }

  let poiPart2 = "";
  let poiPart3 = "";
  if (placesPrompt !== "") {
    poiPart2 =
      "Utilize the distance or travel time information in a natural and coherent way. Do not always mention distance followed by travel time. Use some variations when describing distance or travel time. Do not simply list POIs one by one. You SHALL NOT simply list out the given POIs. Focus on providing a natural description incorporating the POIs. It is important that all POIs are mentioned in the post.";
    if (hasAirport) {
      poiPart3 =
        "Describe the main airport and its drive time to this location. Do not describe airport that has been closed and has ceased operations. For example, describe Brandenburg for Berlin; do not describe Tegel and Tempelhof for Berlin because they have been closed and ceased operations.";
    }
  }

  let prompt = `Write a comprehensive overview of the neighborhood of ${address}. ${no_exact_address}

The task is to craft a detailed description having ${count - 1} paragraphs:

Write a 1st paragraph providing an overview of the city and district where the location is situated, and any unique features or characteristics of the area that make it stand out. 

Write a 2nd paragraph to elaborate on the local culture, people, and history of the area, including any notable historical events or landmarks.

Write a 3rd paragraph to elaborate on housing options and population demographics in the area, including any notable residential developments or housing trends.

${placesPrompt}

Using the information provided above, write a detailed and informative overview of the neighborhood like a professional travel blogger. ${poiPart2} ${poiPart3} ${no_exact_address}
`;
  prompt += locale !== "en-US" ? `\nWrite in ${languageMap[locale]}.` : "";

  return prompt;
};

export async function run(formData: Record<string, any>) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GOOGLE_MAPS_API_KEY is not defined in the environment variables.",
    );
  }

  let address = formData.address;
  if (address.trim() === "") {
    throw new Error(
      "Unexpected empty address in location description generator.",
    );
  }

  if (formData.dont_show_exact_address) {
    address = await getRegion(address);
  }

  // Get place POI details
  const { schoolPlaces, transportPlaces, otherPlaces, hasAirport, iframe } =
    await printLocationPOI(formData, address, apiKey);

  // Return only the POI list if the related box is checked
  let text = "";
  if (formData.poi_list_only) {
    text += schoolPlaces ? schoolPlaces + "\n\n" : "";
    text += transportPlaces ? transportPlaces + "\n\n" : "";
    text += otherPlaces ? otherPlaces : "";
  } else {
    // The "don't show exact address" logic
    let no_exact_address = "";
    if (formData.dont_show_exact_address) {
      no_exact_address =
        "Refer to this address by its district or the region where it is located. You shall not write the full address.";
    }

    // Compose prompt and get GPT response message
    const locale = formData.locale;
    const prompt = buildPrompt(
      address,
      no_exact_address,
      schoolPlaces,
      transportPlaces,
      otherPlaces,
      hasAirport,
      locale,
    );
    text = await gpt_api(prompt, PARAM);
  }

  // Return translated results
  const locales = formData.translations.map((locale: string) => locale.trim());
  await augmentLabelMap(googleMapLocalizations, locales);
  const messages = await translateTextBatch(text, locales, formData.locale);
  return messages.map(([locale, translation]) => ({
    locale: locale,
    contentType: metaData().contentType,
    result: {
      body: [
        {
          value: translation,
        },
        {
          name: googleMapLocalizations[locale],
          value: iframe,
        },
      ],
    },
  }));
}
