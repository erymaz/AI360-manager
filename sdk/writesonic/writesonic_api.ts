export async function writesonic_api(
  formData: Record<string, any>,
  api_param: Record<string, any>,
) {
  let locale = formData.locale;
  locale = locale === "en-US" ? "en" : locale;
  if (!["en", "es", "de"].includes(locale)) {
    locale = "en";
  }
  const formDataCopy = { ...formData };
  delete formDataCopy.translations;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": process.env.WRITESONIC_API_KEY || "",
    },
    body: JSON.stringify(formDataCopy),
  };

  let data;
  try {
    const response = await fetch(
      `https://api.writesonic.com/v2/business/content/${api_param.name}?engine=premium&language=${locale}&num_copies=1`,
      options,
    );
    data = await response.json();
  } catch (err) {
    console.error(err);
  }

  console.log("Writesonic response:");
  console.dir(data, { depth: null });
  return data;
}
