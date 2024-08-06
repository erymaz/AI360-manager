export const apiEndpoint: Record<string, string> = {
  text2img: "https://stablediffusionapi.com/api/v3/text2img",
  img2img: "https://stablediffusionapi.com/api/v3/img2img",
  interior: "https://stablediffusionapi.com/api/v5/interior",
  pix2pix: "https://stablediffusionapi.com/api/v5/pix2pix",
  super_resolution: "https://stablediffusionapi.com/api/v3/super_resolution",
};

interface ParsedResultType {
  output: any;
}

export async function run(formData: Record<string, any>) {
  const task = formData.task;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    key: process.env.STABLEDIFFUSION_API_KEY,
    prompt: formData.prompt,
    negative_prompt: formData.negative_prompt,
    init_image: formData.target_image,
    url: formData.target_image,
    width: formData.target_width,
    height: formData.target_height,
    samples: formData.number_of_samples,
    num_inference_steps: "50", // 10, 20, 30, 40, 50
    steps: 50,
    safety_checker: "yes",
    enhance_prompt: "no",
    guidance_scale: 7.5,
    strength: 0.7,
    webhook: null,
    track_id: null,
    multi_lingual: "no",
    self_attention: "yes",
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let parsedResult: ParsedResultType | undefined;
  await fetch(apiEndpoint[task], requestOptions)
    .then(async (response) => {
      parsedResult = await response.json();
    })
    .catch((error) => console.log("error", error));
  const output = parsedResult?.output;
  const imageUrls = Array.isArray(output) ? output : [output];
  if (parsedResult) {
    parsedResult.output = imageUrls;
  }

  return [
    {
      locale: "en-US",
      contentType: "image",
      result: { body: parsedResult },
    },
  ];
}
