import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Article Url",
        es: "URL del art\u00edculo",
        de: "Artikel-URL",
      },
      value: "",
      name: "article_url",
      maxLength: 2083,
      placeholder: {
        "en-US":
          "https://techcrunch.com/2019/08/12/verizon-is-selling-tumblr-to-wordpress-parent-automattic/",
        es: "https://techcrunch.com/2019/08/12/verizon-est\u00e1-vendiendo-tumblr-a-wordpress-parent-automattic/",
        "de":
          "https://techcrunch.com/2019/08/12/verizon-is-selling-tumblr-to-wordpress-parent-automattic/",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Article Text",
        es: "Texto del art\u00edculo",
        de: "Artikeltext",
      },
      value: "",
      name: "article_text",
    },
    translationsFormField,
  ];
}
