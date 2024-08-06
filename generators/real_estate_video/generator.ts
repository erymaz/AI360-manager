import { generateVideo } from "@/sdk/elai/elai-video-api";
import { buildElaiRequestBody } from "@/sdk/elai/real_estate/elai-video-api";
import { gpt_api } from "@/sdk/gpt/openai_chat";

const PARAM = {
    model: "gpt-35-turbo",
    system_message: "You are a real estate expert.",
    temperature: 0.7,
    max_tokens: 1500,
    top_p: 1.0,
};

function filterImageKeys(formData: Record<string, any>) {
  const excludedKeys = new Set(["title_page_image", "floor_plan_image", "company_logo_image"]);
  return Object.keys(formData).filter(key => {
    return key.endsWith('image') && formData[key].trim() !== '' && !excludedKeys.has(key);
  })
}

export const buildPrompt = (formData: Record<string, any>) => {

  // Get expose from formData
  const expose = formData["expose_text"];

  // Compose slideData from formData
  const uploadedImages = filterImageKeys(formData);
  uploadedImages.push("energy_efficiency_class_image");
  const uploadedImagesStr = uploadedImages.length > 0 ? `Additionally, for each of the images in the list below, analyze the expose to determine if the subject of the image is mentioned in the expose. Add a corresponding JSON object for the image if it is mentioned in the expose. Ignore an image and do not add a corresponding JSON object if it is not mentioned in the expose. For example, if "living room", "parlor" or related concepts are mentioned in the expose, add a corresponding JSON object for \`living_room_image\`. If "bathroom", "restroom", "shower", "bathtub", or related concepts are mentioned, add a corresponding JSON object for \`bathroom_image\`. If "energy efficiency" or related concept is found in the expose, add a slide object for \`energy_efficiency_class_image\`.

List:
\`\`\`
["${uploadedImages.join('", "')}"]
\`\`\`` : "";

  let prompt = `
Based on the real estate expose provided, create a JSON object for property presentation slides.

Expose:
"${expose}"

Based on the above expose, generate a JSON object. An example is shown below. Instructions for building this JSON object are listed in the following. Read each instruction carefully. Make sure all instructions are followed:
- Identify the language of the expose and put the ISO 639-1 two-letter code for the language in \`locale\`
- Look for energy efficiency class rating (A to H) in the expose and put the rating in \`rating\`. The single-letter rating must be explicitly written and provided in the expose as is. Otherwise, leave \`rating\` empty
- \`slideData\` is a JSON object array with each object corresponding to a slide page
- Slide pages are identified by the unique \`image\` field
- These three slides must be included: \`title_page_image\`, \`floor_plan_image\`, and \`conclusion_call_for_action_image\`
- \`text\` is the text written on the slide. Make sure it's short, straight to the point, and eye-catching
- \`speech\` is a short script around 20 to 30 words for the presenter to deliver, so it must be clear and engaging
- Use the identified language for both \`text\` and \`speech\`

Example JSON object:
\`\`\`
{
  "locale": "en",
  "rating": "C",
  "slideData": [
    {
      "image": "title_page_image",
      "text": "Stunning Contemporary Residence with Panoramic Views",
      "speech": "Welcome to a masterpiece of modern luxury living, nestled in a sought-after neighborhood."
    },
    {
      "image": "floor_plan_image",
      "text": "Spacious, Open-Concept Design",
      "speech": "Experience the exquisite layout, from the grand foyer to the gourmet kitchen and luxurious master suite."
    },
    {
      "image": "conclusion_call_for_action_image",
      "text": "Schedule Your Private Tour Today",
      "speech": "Don't miss out on the epitome of contemporary living. Book your private tour today!"
    }
  ]
}
\`\`\`

${uploadedImagesStr}

It is important that no additional JSON objects for slides are created!

Place the \`conclusion_call_for_action_image\` JSON object at the end of the array.
`;

  return prompt;
};

export async function run(formData: Record<string, any>) {

  // Compose the prompt for getting slide JSON from GPT
  const prompt = buildPrompt(formData);

  // Get slide JSON
  let locale;
  let rating;
  let slideData;
  try {
    let response = await gpt_api(prompt, PARAM);
    response = response.replace(/^[^`]*```\n([\s\S]*?)\n```[\s\S]*?$/, "$1");
    ({ locale, rating, slideData } = JSON.parse(response));
  } 
  catch (err) {
    console.log(err);
  }

  // Compose Elai API request body using the slide JSON
  // Call Elai API to generate and render the video
  let videoID;
  try {
    const elaiRequestBody = await buildElaiRequestBody(slideData, formData, locale, rating);
    videoID = await generateVideo(elaiRequestBody);
  } 
  catch (err) {
    console.log(err);
  }

  return [{
    locale: "en-US",
    contentType: "video",
    result: { body: `Video ID: ${videoID}` },
  }];
}
