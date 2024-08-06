import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Task",
        es: "",
        de: "",
      },
      value: "",
      name: "task",
      required: true,
      placeholder: {
        "en-US": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      options: [
        {
          label: {
            "en-US": "Text to image",
            es: "",
            de: "",
          },
          value: "text2img",
        },
        {
          label: {
            "en-US": "Reimagine any image (size same as input)",
            es: "",
            de: "",
          },
          value: "img2img",
        },
        {
          label: {
            "en-US": "Change room interior style (size fixed at 512 px)",
            es: "",
            de: "",
          },
          value: "interior",
        },
        {
          label: {
            "en-US": "2x super-resolution",
            es: "",
            de: "",
          },
          value: "super_resolution",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Prompt",
        es: "",
        de: "",
      },
      placeholder: {
        "en-US": "Description of the things you want in the image",
        es: "",
        de: "",
      },
      value: "",
      name: "prompt",
      maxLength: 1000,
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Negative prompt",
        es: "",
        de: "",
      },
      placeholder: {
        "en-US": "Items you don't want in the image",
        es: "",
        de: "",
      },
      value: "",
      name: "negative_prompt",
      maxLength: 1000,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Text to image width (max 1024 px)",
        es: "",
        de: "",
      },
      value: "1024",
      name: "target_width",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Text to image height (max 1024 px)",
        es: "",
        de: "",
      },
      value: "576",
      name: "target_height",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Number of images to generate",
        es: "",
        de: "",
      },
      value: "1",
      name: "number_of_samples",
      min: 1,
      max: 3,
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Source image",
        es: "",
        de: "",
      },
      name: "target_image",
    },
  ];
}
