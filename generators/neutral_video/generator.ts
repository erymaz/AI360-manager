import { buildElaiRequestBody, generateVideo } from "@/sdk/elai/elai-video-api";
import { gpt_api } from "@/sdk/gpt/openai_chat";

const PARAM = {
    model: "gpt-35-turbo",
    system_message: "You are an expert in transforming descriptive paragraphs into structured presentation slides.",
    temperature: 0,
    max_tokens: 1500,
    top_p: 1.0,
};

function processFormData(formData: Record<string, any>) {
  let result = [];
  for (let key in formData) {
    if (key.startsWith("image_description_")) {
      let index = key.split("_")[2];
      if (formData[`image_${index}`] && formData[key]) {
        let obj = {
          [key]: formData[key],
          text: "",
          speech: ""
        };
        result.push(obj);
      }
    }
  }
  return result;
}

export const buildPrompt = (formData: Record<string, any>) => {

  const description = formData["product_description"];

  // Compose slideData from formData
  const uploadedImages = processFormData(formData);
  if (uploadedImages.length == 0) {
    throw new Error('No images uploaded!');
  }

  const uploadedImagesStr = JSON.stringify({locale: '', slideData: uploadedImages}, null, 2);

  let prompt = `Based on the product description provided, create a JSON object for product presentation slides.

Product Description:
"${description}"

Based on the above description, complete the JSON object below by filling in missing "locale", "text", and "speech" fields. Instructions are listed in the following. Read each instruction carefully. Make sure all instructions are followed:
- Identify the language of the expose and put the ISO 639-1 two-letter code for the language in \`locale\`
- \`slideData\` is a JSON object array with each object corresponding to a slide page
- You shall not create additional JSON objects for slides
- \`image_description_i\` defines what's presented on the ith slide page
- \`text\` is the text written on the slide. Make sure it's short, straight to the point, and eye-catching
- \`speech\` is a short script around 20 to 30 words for the presenter to deliver, so it must be clear and engaging
- \`text\` and \`speech\` must be consistent with the image description
- Use the identified language for both \`text\` and \`speech\`
- If a particular image description is not covered and supported in the Product Description. Remove the slide object from the JSON array

${uploadedImagesStr}

It is important that no additional JSON objects for slides are created!

Generate the JSON object without any additional text.
`;

  return prompt;
};

export async function run(formData: Record<string, any>) {

  // Compose the prompt for getting slide JSON from GPT
  const prompt = buildPrompt(formData);

  // Get slide JSON
  let locale;
  let slideData;
  try {
    let response = await gpt_api(prompt, PARAM);
    response = response.replace(/^[^`]*```\n([\s\S]*?)\n```[\s\S]*?$/, "$1");
    ({ locale, slideData } = JSON.parse(response));
  } 
  catch (err) {
    console.log(err);
  }

  // Compose Elai API request body using the slide JSON
  // Call Elai API to generate and render the video
  let videoID;
  try {
    const elaiRequestBody = await buildElaiRequestBody(slideData, formData, locale);
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
