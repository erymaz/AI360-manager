import { metaData } from "./main";
import { getFormSchema } from "./form";
import { FormFieldType } from "@/types";
import { translateTextBatch } from "@/sdk/utils";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";

const PARAM = {
    model: "gpt-35-turbo",
    system_message: "",
    temperature: 0.1,
    top_p: 1.0,
};

const charLimitMap = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
}

function getLabelByValue(formSchema: Record<string, any>[], fieldName: string, chosenValue: string) {
  const field = formSchema.find(field => field.name === fieldName);
  return field?.formFieldType === FormFieldType.Dropdown
    ? field.options.find((option: { value: string; label: string }) => option.value === chosenValue)?.label
    : null;
}

export const buildPrompt = (formData: Record<string, any>, formSchema: Record<string, any>[]) => {
  const media = formData.social_media_site;
  const description = formData.product_description;
  const image = formData.additional_image;
  let style = getLabelByValue(formSchema, "story_style", formData.story_style)["en-US"];
  if (style.toLowerCase().startsWith("single paragraph")) style += ". Target less than 50 words"
  const tone = getLabelByValue(formSchema, "tone", formData.tone)["en-US"];
  const hashtags = formData.hashtags;
  const charLimit = charLimitMap[media as keyof typeof charLimitMap];

  const promptForImage = image ? ` Include an accompanying image URL (${image}) at the end of the post.` : "";
  const promptForHashtag = hashtags ? ` Finally, incorporate these hashtags into the post where appropriate: ${hashtags}.` : "";
  const promptForCharLimit = charLimit ? ` The character limit for a ${media} post is ${charLimit}. It is important that the generated post has fewer than ${charLimit} characters.` : "";

  let prompt = `Generate a social media post for ${media}. The post should reflect the typical writing style and conventions of the platform.${promptForCharLimit} The content of the post should be based on the following description:
"${description}"

`;
  prompt = prompt.substring(0, 20000);
  prompt += `The writing style should correspond to '${style}'. Ensure that the tone of the post aligns with '${tone}'. If the style involves 'bullet points', extract the key points from the description.${promptForImage}${promptForHashtag}${promptForCharLimit}`;
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
