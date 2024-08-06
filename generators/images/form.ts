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
            "en-US": "Text to image (size fixed at 1024 px)",
            es: "",
            de: "",
          },
          value: "text_to_image",
        },
        {
          label: {
            "en-US": "Reimagine (source image max 1024 px)",
            es: "",
            de: "",
          },
          value: "reimagine",
        },
        {
          label: {
            "en-US": "Remove background (source image max 25M px)",
            es: "",
            de: "",
          },
          value: "remove_background",
        },
        {
          label: {
            "en-US": "Replace background (source image max 2048 px)",
            es: "",
            de: "",
          },
          value: "replace_background",
        },
        {
          label: {
            "en-US": "Remove text (source image max 16M px)",
            es: "",
            de: "",
          },
          value: "remove_text",
        },
        {
          label: {
            "en-US": "Inpainting / remove objects (source image max 16M px)",
            es: "",
            de: "",
          },
          value: "cleanup",
        },
        {
          label: {
            "en-US": "Image upscaling (source image max 16M px; size as specified)",
            es: "",
            de: "",
          },
          value: "upscale",
        }
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
        "en-US": "Write the prompt here",
        es: "",
        de: "",
      },
      value: "",
      name: "prompt",
      maxLength: 1000,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Target width (max 4096 px)",
        es: "",
        de: "",
      },
      value: "",
      name: "target_width",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Target height (max 4096 px)",
        es: "",
        de: "",
      },
      value: "",
      name: "target_height",
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
