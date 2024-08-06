// Makes a POST request to the OpenAI API, using GPT-3.5 or GPT-4 for text completion,
// and returns the completed message.
export async function gpt_api(prompt: string, api_param: Record<string, any>) {
  const messages = [{"role": "user", "content": prompt}];
  if (api_param.system_message) {
    messages.unshift({"role": "system", "content": api_param.system_message});
  }
  console.log("GPT prompt:");
  console.log(JSON.stringify(messages, null, 2).replace(/\\n/g, '\n').replace(/\\"/g, '"'));

  // Use Azure for GPT3.5, OpenAI for GPT4. Plan is to migrate to Azure completely
  const useAzure = api_param.model === 'gpt-35-turbo';
  const openaiUrl = useAzure ? process.env.AZURE_OPENAI_API_URL : process.env.OPENAI_API_URL;
  const apiKeyKey = useAzure ? 'api-key' : 'Authorization';
  const apiKeyValue = useAzure ? process.env.AZURE_OPENAI_API_KEY : `Bearer ${process.env.OPENAI_API_KEY}`;
  console.log("Use Azure:", useAzure);

  if (!openaiUrl) {
    throw new Error('API URL is not set.');
  }

  if (!apiKeyValue || !process.env.OPENAI_ORG_ID) {
    throw new Error('API keys or organization ID is not set.');
  }

  const response = await fetch(openaiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [apiKeyKey]: apiKeyValue,
      "OpenAI-Organization": `${process.env.OPENAI_ORG_ID}`,
    },
    body: JSON.stringify({
      model: api_param.model,
      messages: messages,
      temperature: api_param.temperature,
      max_tokens: api_param.max_tokens,
      top_p: api_param.top_p,
    }),
  });
  const data = await response.json();
  console.log("GPT response:");
  console.dir(data, { depth: null });
  const message = data["choices"][0]["message"]["content"];
  return message;
}
