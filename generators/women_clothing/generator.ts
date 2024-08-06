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
  let examples = `Example 1:
"Women's Curvy Girlfriend Jeans, Created for Macy's
 
positive reviews is 86%. with 188
4.3 (188)
EUR 21.16 with code: DAD EUR 37.62 Details
Please select a color                     Aspen Wash                             Aurora                             Bright White                             Henri Patchwork                             Indigo Blossom                             Ranger                
Current selected color: Ranger
COLOR: RANGER
EUR 35.35


Product Details
Get a perfectly laid-back look with Style & Co's mid-rise ankle jeans featuring cuffed hems and a touch of stretch in a flattering curvy silhouette.
* Imported
* Zipper and button closure; belt loops
* Slimming Pockets
* Created for Macy's
* Connect with a stylist & get free expert advice online or in stores for your wardrobe, home & more. Book Now
Size & Fit
* Mid rise; approx. 15-1/2"
* Approx. inseam: 26" cuffed; 28" uncuffed
Materials & Care
* Cotton/spandex
* Machine washable
Web ID: 15265234


Product Details
Get a perfectly laid-back look with Style & Co's mid-rise ankle jeans featuring cuffed hems and a touch of stretch in a flattering curvy silhouette.
* Imported
* Zipper and button closure; belt loops
* Slimming Pockets
* Created for Macy's
* Connect with a stylist & get free expert advice online or in stores for your wardrobe, home & more. Book Now
Size & Fit
* Mid rise; approx. 15-1/2"
* Approx. inseam: 26" cuffed; 28" uncuffed
Materials & Care
* Cotton/spandex
* Machine washable
Web ID: 15265234


Product Details
A classic pick from Eileen West, wrap yourself up in this beautifully quilted robe designed with a matching belt and two patch pockets.
* Sleeve Length: Long sleeves
* Texture: Double-knit diamond quilt fabric
* Imported
* Closure: Open front
* Special Features: Twisted rope piping at collar; set-in belt; two patch pockets at front
Materials & Care
* Machine washable
* Cotton/polyester
Web ID: 15265722


Shipping & Free Returns
* Select items are excluded from international shipping exclusions & details
* Free shipping applies to domestic leg only, additional shipping fees and duties may apply at checkout.
* Returns are accepted at any Macy's store within 30 days from purchase date. Last Act items are final sale and sold "as is." No returns, exchanges, or price adjustments allowed.
* For complete details, read our Shipping and Return policies.
* Please call customer service for returns."

Example 2:
"KURZES WEITES KLEID MIT DRAPIERUNG
39,95 EUR
inkl. MWSt./exkl. Versandkosten.
Sleeveless knit dress featuring a round neck, gathered detail with drawstrings at the shoulder and puff cape fabric at the top.
DUNKELANTHRAZIT | 2931/721
Größe wählen
* XS
* S
* M
* L
* XL
* XXL
FINDEN SIE IHRE GRÖSSLEITFADEN FÜR GRÖSSE
Zum Warenkorb hinzufügen
IN DEN EINKAUFSKORB
* VERFÜGBARKEIT IM GESCHÄFT PRÜFEN
* VERSAND, UMTAUSCH UND RÜCKGABE
MATERIALZUSAMMENSETZUNG, PFLEGEHINWEISE UND HERKUNFT
MATERIALZUSAMMENSETZUNG
Um die Einhaltung unserer Sozial- und Umweltstandards sowie die Sicherheit und Gesundheit unserer Kleidung zu gewährleisten, setzten wir Nachverfolgungsprogramme um.


Um ihre Einhaltung zu bewerten, haben wir ein fortlaufendes Überwachungs- und Verbesserungsprogramm entwickelt.
AUSSEN
87% polyamid
13% elastan
FUTTER
100% polyester
PFLEGE
Pflege Ihrer Kleidung bedeutet Pflege der Umwelt.
Waschgänge bei niedrigen Temperaturen und sanfte Schleuderprogramme schonen die Kleidungsstücke und tragen dazu bei, Farbe, Form und Struktur des Stoffes zu erhalten. Gleichzeitig wird so der Energieverbrauch bei Pflegeprozessen reduziert.
* Maschinenwäsche bis 30º C kurz schleudern
* Nicht bleichen
* Bei max. 110º C bügeln
* Nicht chemisch reinigen
* Nicht trocknen


HERKUNFT
Wir arbeiten mit unseren Lieferanten, Arbeitnehmern/innen, Gewerkschaften und internationalen Organisationen zusammen, um eine Lieferkette zu entwickeln, in der die Menschenrechte respektiert und gefördert werden und die zu den Zielen der Vereinten Nationen für nachhaltige Entwicklung beiträgt.


Dank der Zusammenarbeit mit unseren Lieferanten setzen wir uns dafür ein, die Einrichtungen und Verfahren zur Herstellung unserer Kleidungsstücke kennenzulernen, um die Rückverfolgbarkeit unserer Produkte zu gewährleisten.
Hergestellt in Marokko"`;
  examples = examples.slice(0, 20000 - productSpec.length);
  let prompt = `Write a product description for women clothing. Learn the tone and writing style from the following examples. DO NOT duplicate specific features from them, especially numbers.

${examples}

You SHALL NOT copy numbers and specific product features from the examples. You can only learn from their writing style.

The task is to write a description for women clothing:
`;
  prompt += productSpec;
  prompt += `

Write no other features.
`;
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
