
export const getProviderInfo = async (domain: string) => {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: 'llama-3-sonar-small-32k-online',
        messages: [
          {
            role: "system",
            content: "Add '-' as prefix for each pieces of data"
          },
          {
            role: 'user',
            content: `what is the company that owns ${domain}? Provide each of the following pieces of data as a separate entity to be inserted on a database: company legal name, company description, address, zip_code, city, country and Logo`,
          }],
      }),
    });
  
    const data = await response.json();
    const arr = data.choices[0].message?.content?.split("\n-");
    console.log(arr)
    let name = '';
    let description = '';
    let address = '';
    let city = '';
    let country = '';
    let zipCode = '';
    for (const data of arr) {
      if (data.includes('Name')) {
        name = data.split(":")[1].replace("**", "").trim().replace(".", "");
      }
      if (data.includes('Description')) {
        description = data.split(":")[1].replace("**", "").trim().replace(".", "");
      }
      if (data.includes('Address')) {
        address = data.split(":")[1].replace("**", "").trim().replace(".", "");
      }
      if (data.includes('City')) {
        city = data.split(":")[1].replace("**", "").trim().replace(".", "");
      }
      if (data.includes('Country')) {
        country = data.split(":")[1].replace("**", "").trim().replace(".", "");
      }
      if (data.includes('Zip Code')) {
        zipCode = data.split(":")[1].replace("**", "").trim().replace(".", "");
      }
    }

    return {
      address,
      city,
      country,
      zipCode,
      name,
      description,
      logo: `https://logo.clearbit.com/${domain}`
    }
  } catch (err) {
    console.log(err);
  }
}
