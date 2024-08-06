// This function translates a given text into multiple languages concurrently using
// the Google Translate API and returns an array of translated messages or error messages
export async function translateTextBatch(
  text: string,
  locales: string[],
  userLocale: string = "en-US",
) {
  return await Promise.all(
    locales.map((locale) => {
      if (locale === userLocale) {
        return Promise.resolve([locale, text]);
      } else {
        return googleTranslate(text, locale === "en-US" ? "en" : locale)
          .then((translatedText) => [locale, translatedText])
          .catch((e) => [locale, `ERROR: Translation failed`]);
      }
    }),
  );
}

export async function augmentLabelMap(
  labelMap: Record<string, string>,
  locales: string[],
) {
  const diffLocales = locales.filter(
    (locale) => !labelMap.hasOwnProperty(locale),
  );
  if (diffLocales.length > 0) {
    const labelTranslations = await translateTextBatch(
      labelMap["en-US"],
      diffLocales,
    );
    labelTranslations.forEach(([locale, translation]) => {
      labelMap[locale] = translation;
    });
  }
}

// This function uses Google's Translation API to translate a given text into a
// specified language. It throws an error if the translation fails or if the API
// key is invalid.
async function googleTranslate(text: string, langCode: string) {
  const url = process.env.GOOGLE_TRANSLATE_API_URL;
  if (!url) {
    throw new Error("GOOGLE_TRANSLATE_API_URL is not defined");
  }

  const params = new URLSearchParams();
  params.append("q", text);
  params.append("target", langCode);
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY is not defined");
  }
  params.append("key", apiKey);
  params.append("format", "text");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  if (!data.data || !data.data.translations || !data.data.translations.length) {
    throw new Error("No translation found");
  }

  return data.data.translations[0].translatedText;
}

export function formNameToLabel(
  formData: Record<string, any>,
  formSchema: Record<string, any>[],
) {
  const ignoreKeys = new Set([
    "locale",
    "translations",
    "dont_show_exact_address",
  ]);
  const schemaMap = new Map(formSchema.map((item) => [item.name, item]));
  const labelData: Record<string, any> = {};
  const badValues = new Set(["0", "poor", "bad", "no", "none"]);
  for (const key in formData) {
    if (ignoreKeys.has(key)) continue;
    const v = formData[key];
    if ((typeof v === "string" && badValues.has(v.toLowerCase())) || !v)
      continue;
    if (Array.isArray(v) && v.length === 0) continue;
    const schemaItem = schemaMap.get(key);
    if (schemaItem) {
      const locale = formData.locale || "en-US";
      let label = schemaItem.label;
      if (typeof label === "object") label = label[locale];
      let value = v;
      if (schemaItem.options) {
        if (Array.isArray(v)) {
          value = v.map((val) => {
            const option = schemaItem.options.find(
              (option: any) => option.value === val,
            );
            return option
              ? typeof option.label === "object"
                ? option.label[locale]
                : option.label
              : val;
          });
        } else {
          const option = schemaItem.options.find(
            (option: any) => option.value === v,
          );
          if (option && option.label) {
            value =
              typeof option.label === "object"
                ? option.label[locale]
                : option.label;
          }
        }
      }
      labelData[label] =
        typeof value === "string" ? value.replace(/_/g, " ") : value;
    }
  }

  return labelData;
}

export function formToSpecStr(
  formData: Record<string, any>,
  formSchema: Record<string, any>[],
  prefix: string = "Discuss in detail ",
) {
  const labelData = formNameToLabel(formData, formSchema);
  return Object.entries(labelData)
    .map(
      ([key, value]) =>
        `${prefix}"${key}"${
          value === true || value === "true"
            ? ""
            : `: ${typeof value === "string" ? `"${value}"` : value}`
        }`,
    )
    .join("\n");
}
