import { metaData } from "./main";
import { getFormSchema } from "./form";
import { translateTextBatch, formToSpecStr } from "@/sdk/utils";
import { gpt_api } from "@/sdk/gpt/openai_chat";
import { languageMap } from "@/sdk/localization";

const PARAM = {
    model: "gpt-35-turbo",
    system_message: "",
    temperature: 0.75,
    top_p: 1.0,
};

export const buildPrompt = (formData: Record<string, any>, formSchema: Record<string, any>[]) => {
  const productSpec = formToSpecStr(formData, formSchema);
  let prompt = `Write a product description for bikes. Learn the tone and writing style from the following example. DO NOT duplicate specific features from them, especially numbers.

Example:
"The Ozark Trail 24" Glide Youth Mountain Bike hits the sweet spot with its capability, versatility, and affordability. Sporting a glossy blue lightweight aluminum frame with a specially tapered headtube, this mountain bike is designed specifically for your child's, tween's, or teen's trail-riding needs. The dual mechanical disc brakes give substantial stopping power during normal trail riding and deep descents. Knobby MTB tires and a front suspension fork let your child tackle tougher terrain with ease. A Shimano 1x8 speed drivetrain gives them a wide gearing range, making longer and more difficult climbs easier and more efficient. They'll also be able to quickly and smoothly transition through the eight gears with the handlebar-mounted trigger shifters as they tear up the trail. Adjustability is key for a proper fit, so this bike offers an adjustable saddle height for growing riders. If you're looking for a capable mountain bike for your teen to help them keep up, the Ozark Trail 24" Glide Boy's Mountain Bike has you covered.
The 26" Charleston cruiser bike, assembled in South Carolina, is a classic cruiser for the beach and beyond. The bike has a clean and classy finish and is made with a sturdy steel frame. Comfortable upright riding position and soft padded seat is the formula for casual all-day fun. The low step-through frame of this Charleston bike also makes for an easy on and off. It has an easy foot-operated coaster brake and barefoot friendly pedals. This beauty even comes with fenders to keep you dry and clean and a basket for your stuff. The Charleston cruiser has a stylish package at an affordable price.
It's right for you if...
You have refined taste in mountain bikes, and don't like to settle. You want a bike built to tackle the whole mountain and rule it all with the finest technology the bike industry has to offer, from its light and stiff carbon frame and wheels that track through the hairiest lines, to the FOX Factory fork and fully wireless SRAM XX1 top-tier groupset.
The tech you get
A featherweight OCLV Mountain Carbon frame built to handle the rough and rowdy, a pair of finely laced carbon wheels that track through technical terrain with ease, and SRAM's top-tier XX1 AXS fully wireless electronic drivetrain. Plus, you get the silky smooth travel of a 150mm FOX Factory 36 Fork with EVOL air spring and GRIP2 damper and 140mm of FOX Factory Float rear suspension with 2-position damper, all topped off with adjustable geometry for fine-tuning your ride to you and internal frame storage that lets you keep your setup tidy without leaving behind trail essentials.
The final word
Fuel EX 9.9 is a bike built to satisfy those with the finest taste. It pairs together an all- mountain trail capable carbon frame with the finest components you'll find on a modern mountain bike, from its carbon hoops to wireless SRAM XX1 AXS shifting. It's all wrapped up with adjustable geometry, so you can fine tune your ride to always feel how you want it.

Why you'll love it
* You care about the finer things in life, like silky-smooth suspension that feels greater than the sum of its numbers, and fully wireless shifting that keep your setup tidy and low maintenance
* You can tackle any trail on the mountain with its progressive geometry that makes light work of steep, punchy climbs, and turns around to rally the descents
* It comes with light and stiff carbon wheels that make quick work of technical terrain and keep you on your line, even when things get hairy
* We expanded our size range to ensure a better fit for all riders, and use the best-fitting wheels for each frame size: XS frames get 27.5˝ wheels, S frames get to choose between 27.5˝ or 29˝, and sizes M and up get 29˝ wheels
* With the adjustable angle headset (angled cups sold separately) and Mino Link, you can choose from six different geometry configurations"


You SHALL NOT copy numbers and specific product features from the example. You can only learn from its writing style.

The task is to write a description for bikes:
`;
  prompt += productSpec.slice(0, 20000 - prompt.length);
  prompt += "\n\nWrite no other features.";
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
