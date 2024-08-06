import { formToSpecStr } from "@/sdk/utils";

function getOrdinal(n: number) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function composeSections(
  formData: Record<string, any>,
  sections: string[],
  formSchema: Record<string, any>[],
  paragraphCount: number,
) {
  const _formData: Record<string, any> = {};
  sections.forEach((key) => {
    if (formData[key] !== undefined) {
      _formData[key] = formData[key];
    }
  });

  _formData.locale = formData.locale;
  let text = formToSpecStr(_formData, formSchema, "");

  if (text) {
    const elmentNum = text.split("\n").length;
    text = text
      .split("\n")
      .map((line, idx) => `  ${idx + 1}. ${line}`)
      .join("\n");
    text = `Write a ${getOrdinal(
      paragraphCount,
    )} paragraph to elaborate on the following ${elmentNum} feature${
      elmentNum > 1 ? "s" : ""
    }:\n${text}\n\n`;
    paragraphCount += 1;
  }

  return [text, paragraphCount];
}

export function buildPropertyDetailFromForm(
  formData: Record<string, any>,
  formSchema: Record<string, any>[],
  sectionGroups: string[][],
) {
  let text = "";
  let sectionText = "";
  let paragraphCount = 1;
  sectionGroups.forEach((sectionGroup) => {
    [sectionText, paragraphCount] = composeSections(
      formData,
      sectionGroup,
      formSchema,
      paragraphCount,
    ) as [string, number];
    text += sectionText;
  });

  return [text.trimEnd(), paragraphCount];
}
