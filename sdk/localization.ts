import { FormField, FormFieldType } from "@/types";
import * as acceptLanguageParser from "accept-language-parser";

const languageNameInEnglish = new Intl.DisplayNames(["en"], {
  type: "language",
});

export const languageMap = new Proxy<Record<string, string>>(
  {},
  {
    get: function (target, locale: string) {
      locale = acceptLanguageParser.parse(locale)?.[0]?.code || "en";
      if (!target[locale]) {
        target[locale] = languageNameInEnglish.of(locale) || "English";
      }
      return target[locale];
    },
  },
);

export const translationsFormField: Record<string, any> = {
  formFieldType: FormFieldType.Multiselect,
  label: {
    "en-US": "Translation languages (your own language is already selected)",
    es: "Idiomas de traducci\u00f3n",
    de: "\u00dcbersetzungssprachen (Ihre eigene Sprache ist bereits ausgewählt)",
  },
  value: [],
  name: "translations",
  options: [
    {
      label: {
        "en-US": "Afrikaans",
        es: "Afrikáans",
        de: "Afrikaans",
      },
      value: "af",
    },
    {
      label: {
        "en-US": "Albanian",
        es: "Albanés",
        de: "Albanisch",
      },
      value: "sq",
    },
    {
      label: {
        "en-US": "Amharic",
        es: "Amárico",
        de: "Amharisch",
      },
      value: "am",
    },
    {
      label: {
        "en-US": "Arabic",
        es: "Árabe",
        de: "Arabisch",
      },
      value: "ar",
    },
    {
      label: {
        "en-US": "Armenian",
        es: "Armenio",
        de: "Armenisch",
      },
      value: "hy",
    },
    {
      label: {
        "en-US": "Assamese",
        es: "Asamés",
        de: "Assamesisch",
      },
      value: "as",
    },
    {
      label: {
        "en-US": "Aymara",
        es: "Aymara",
        de: "Aymara",
      },
      value: "ay",
    },
    {
      label: {
        "en-US": "Azerbaijani",
        es: "Azerbaiyano",
        de: "Aserbaidschanisch",
      },
      value: "az",
    },
    {
      label: {
        "en-US": "Bambara",
        es: "Bambara",
        de: "Bambara",
      },
      value: "bm",
    },
    {
      label: {
        "en-US": "Basque",
        es: "Vasco",
        de: "Baskisch",
      },
      value: "eu",
    },
    {
      label: {
        "en-US": "Belarusian",
        es: "Bielorruso",
        de: "Weißrussisch",
      },
      value: "be",
    },
    {
      label: {
        "en-US": "Bengali",
        es: "Bengalí",
        de: "Bengalisch",
      },
      value: "bn",
    },
    {
      label: {
        "en-US": "Bhojpuri",
        es: "Bhojpuri",
        de: "Bhojpuri",
      },
      value: "bho",
    },
    {
      label: {
        "en-US": "Bosnian",
        es: "Bosnio",
        de: "Bosnisch",
      },
      value: "bs",
    },
    {
      label: {
        "en-US": "Bulgarian",
        es: "Búlgaro",
        de: "Bulgarisch",
      },
      value: "bg",
    },
    {
      label: {
        "en-US": "Catalan",
        es: "Catalán",
        de: "Katalanisch",
      },
      value: "ca",
    },
    {
      label: {
        "en-US": "Cebuano",
        es: "Cebuano",
        de: "Cebuano",
      },
      value: "ceb",
    },
    {
      label: {
        "en-US": "Chinese (Simplified)",
        es: "Chino (Simplificado)",
        de: "Chinesisch (Vereinfacht)",
      },
      value: "zh-CN",
    },
    {
      label: {
        "en-US": "Chinese (Traditional)",
        es: "Chino (Tradicional)",
        de: "Chinesisch (Traditionell)",
      },
      value: "zh-TW",
    },
    {
      label: {
        "en-US": "Corsican",
        es: "Corso",
        de: "Korsisch",
      },
      value: "co",
    },
    {
      label: {
        "en-US": "Croatian",
        es: "Croata",
        de: "Kroatisch",
      },
      value: "hr",
    },
    {
      label: {
        "en-US": "Czech",
        es: "Checo",
        de: "Tschechisch",
      },
      value: "cs",
    },
    {
      label: {
        "en-US": "Danish",
        es: "Danés",
        de: "Dänisch",
      },
      value: "da",
    },
    {
      label: {
        "en-US": "Dhivehi",
        es: "Divehi",
        de: "Dhivehi",
      },
      value: "dv",
    },
    {
      label: {
        "en-US": "Dogri",
        es: "Dogri",
        de: "Dogri",
      },
      value: "doi",
    },
    {
      label: {
        "en-US": "Dutch",
        es: "Holandés",
        de: "Niederländisch",
      },
      value: "nl",
    },
    {
      label: {
        "en-US": "English",
        es: "Inglés",
        de: "Englisch",
      },
      value: "en-US",
    },
    {
      label: {
        "en-US": "Esperanto",
        es: "Esperanto",
        de: "Esperanto",
      },
      value: "eo",
    },
    {
      label: {
        "en-US": "Estonian",
        es: "Estonio",
        de: "Estnisch",
      },
      value: "et",
    },
    {
      label: {
        "en-US": "Ewe",
        es: "Ewe",
        de: "Ewe",
      },
      value: "ee",
    },
    {
      label: {
        "en-US": "Filipino (Tagalog)",
        es: "Filipino (Tagalo)",
        de: "Filipino (Tagalog)",
      },
      value: "fil",
    },
    {
      label: {
        "en-US": "Finnish",
        es: "Finés",
        de: "Finnisch",
      },
      value: "fi",
    },
    {
      label: {
        "en-US": "French",
        es: "Francés",
        de: "Französisch",
      },
      value: "fr",
    },
    {
      label: {
        "en-US": "Frisian",
        es: "Frisón",
        de: "Friesisch",
      },
      value: "fy",
    },
    {
      label: {
        "en-US": "Galician",
        es: "Gallego",
        de: "Galicisch",
      },
      value: "gl",
    },
    {
      label: {
        "en-US": "Georgian",
        es: "Georgiano",
        de: "Georgisch",
      },
      value: "ka",
    },
    {
      label: {
        "en-US": "German",
        es: "Alemán",
        de: "Deutsch",
      },
      value: "de",
    },
    {
      label: {
        "en-US": "Greek",
        es: "Griego",
        de: "Griechisch",
      },
      value: "el",
    },
    {
      label: {
        "en-US": "Guarani",
        es: "Guaraní",
        de: "Guarani",
      },
      value: "gn",
    },
    {
      label: {
        "en-US": "Gujarati",
        es: "Guyaratí",
        de: "Gujarati",
      },
      value: "gu",
    },
    {
      label: {
        "en-US": "Haitian Creole",
        es: "Criollo haitiano",
        de: "Haitianisches Kreol",
      },
      value: "ht",
    },
    {
      label: {
        "en-US": "Hausa",
        es: "Hausa",
        de: "Hausa",
      },
      value: "ha",
    },
    {
      label: {
        "en-US": "Hawaiian",
        es: "Hawaiano",
        de: "Hawaiisch",
      },
      value: "haw",
    },
    {
      label: {
        "en-US": "Hebrew",
        es: "Hebreo",
        de: "Hebräisch",
      },
      value: "he",
    },
    {
      label: {
        "en-US": "Hindi",
        es: "Hindi",
        de: "Hindi",
      },
      value: "hi",
    },
    {
      label: {
        "en-US": "Hmong",
        es: "Hmong",
        de: "Hmong",
      },
      value: "hmn",
    },
    {
      label: {
        "en-US": "Hungarian",
        es: "Húngaro",
        de: "Ungarisch",
      },
      value: "hu",
    },
    {
      label: {
        "en-US": "Icelandic",
        es: "Islandés",
        de: "Isländisch",
      },
      value: "is",
    },
    {
      label: {
        "en-US": "Igbo",
        es: "Igbo",
        de: "Igbo",
      },
      value: "ig",
    },
    {
      label: {
        "en-US": "Ilocano",
        es: "Ilocano",
        de: "Ilokano",
      },
      value: "ilo",
    },
    {
      label: {
        "en-US": "Indonesian",
        es: "Indonesio",
        de: "Indonesisch",
      },
      value: "id",
    },
    {
      label: {
        "en-US": "Irish",
        es: "Irlandés",
        de: "Irisch",
      },
      value: "ga",
    },
    {
      label: {
        "en-US": "Italian",
        es: "Italiano",
        de: "Italienisch",
      },
      value: "it",
    },
    {
      label: {
        "en-US": "Japanese",
        es: "Japonés",
        de: "Japanisch",
      },
      value: "ja",
    },
    {
      label: {
        "en-US": "Javanese",
        es: "Javanés",
        de: "Javanisch",
      },
      value: "jv",
    },
    {
      label: {
        "en-US": "Kannada",
        es: "Canarés",
        de: "Kannada",
      },
      value: "kn",
    },
    {
      label: {
        "en-US": "Kazakh",
        es: "Kazajo",
        de: "Kasachisch",
      },
      value: "kk",
    },
    {
      label: {
        "en-US": "Khmer",
        es: "Jemer",
        de: "Khmer",
      },
      value: "km",
    },
    {
      label: {
        "en-US": "Kinyarwanda",
        es: "Kinyarwanda",
        de: "Kinyarwanda",
      },
      value: "rw",
    },
    {
      label: {
        "en-US": "Konkani",
        es: "Konkani",
        de: "Konkani",
      },
      value: "gom",
    },
    {
      label: {
        "en-US": "Korean",
        es: "Coreano",
        de: "Koreanisch",
      },
      value: "ko",
    },
    {
      label: {
        "en-US": "Krio",
        es: "Krio",
        de: "Krio",
      },
      value: "kri",
    },
    {
      label: {
        "en-US": "Kurdish",
        es: "Kurdo",
        de: "Kurdisch",
      },
      value: "ku",
    },
    {
      label: {
        "en-US": "Kurdish (Sorani)",
        es: "Kurdo (Sorani)",
        de: "Kurdisch (Sorani)",
      },
      value: "ckb",
    },
    {
      label: {
        "en-US": "Kyrgyz",
        es: "Kirguís",
        de: "Kirgisisch",
      },
      value: "ky",
    },
    {
      label: {
        "en-US": "Lao",
        es: "Lao",
        de: "Laotisch",
      },
      value: "lo",
    },
    {
      label: {
        "en-US": "Latin",
        es: "Latín",
        de: "Latein",
      },
      value: "la",
    },
    {
      label: {
        "en-US": "Latvian",
        es: "Letón",
        de: "Lettisch",
      },
      value: "lv",
    },
    {
      label: {
        "en-US": "Lingala",
        es: "Lingala",
        de: "Lingala",
      },
      value: "ln",
    },
    {
      label: {
        "en-US": "Lithuanian",
        es: "Lituano",
        de: "Litauisch",
      },
      value: "lt",
    },
    {
      label: {
        "en-US": "Luganda",
        es: "Luganda",
        de: "Luganda",
      },
      value: "lg",
    },
    {
      label: {
        "en-US": "Luxembourgish",
        es: "Luxemburgués",
        de: "Luxemburgisch",
      },
      value: "lb",
    },
    {
      label: {
        "en-US": "Macedonian",
        es: "Macedonio",
        de: "Mazedonisch",
      },
      value: "mk",
    },
    {
      label: {
        "en-US": "Maithili",
        es: "Maithili",
        de: "Maithili",
      },
      value: "mai",
    },
    {
      label: {
        "en-US": "Malagasy",
        es: "Malgache",
        de: "Madagassisch",
      },
      value: "mg",
    },
    {
      label: {
        "en-US": "Malay",
        es: "Malayo",
        de: "Malaiisch",
      },
      value: "ms",
    },
    {
      label: {
        "en-US": "Malayalam",
        es: "Malayalam",
        de: "Malayalam",
      },
      value: "ml",
    },
    {
      label: {
        "en-US": "Maltese",
        es: "Maltés",
        de: "Maltesisch",
      },
      value: "mt",
    },
    {
      label: {
        "en-US": "Maori",
        es: "Maorí",
        de: "Maori",
      },
      value: "mi",
    },
    {
      label: {
        "en-US": "Marathi",
        es: "Maratí",
        de: "Marathi",
      },
      value: "mr",
    },
    {
      label: {
        "en-US": "Meiteilon (Manipuri)",
        es: "Meiteilon (Manipuri)",
        de: "Meiteilon (Manipuri)",
      },
      value: "mni-Mtei",
    },
    {
      label: {
        "en-US": "Mizo",
        es: "Mizo",
        de: "Mizo",
      },
      value: "lus",
    },
    {
      label: {
        "en-US": "Mongolian",
        es: "Mongol",
        de: "Mongolisch",
      },
      value: "mn",
    },
    {
      label: {
        "en-US": "Myanmar (Burmese)",
        es: "Birmano",
        de: "Birmanisch",
      },
      value: "my",
    },
    {
      label: {
        "en-US": "Nepali",
        es: "Nepalí",
        de: "Nepalesisch",
      },
      value: "ne",
    },
    {
      label: {
        "en-US": "Norwegian",
        es: "Noruego",
        de: "Norwegisch",
      },
      value: "no",
    },
    {
      label: {
        "en-US": "Nyanja (Chichewa)",
        es: "Nyanja (Chichewa)",
        de: "Nyanja (Chichewa)",
      },
      value: "ny",
    },
    {
      label: {
        "en-US": "Odia (Oriya)",
        es: "Odia (Oriya)",
        de: "Odia (Oriya)",
      },
      value: "or",
    },
    {
      label: {
        "en-US": "Oromo",
        es: "Oromo",
        de: "Oromo",
      },
      value: "om",
    },
    {
      label: {
        "en-US": "Pashto",
        es: "Pastún",
        de: "Paschtunisch",
      },
      value: "ps",
    },
    {
      label: {
        "en-US": "Persian",
        es: "Persa",
        de: "Persisch",
      },
      value: "fa",
    },
    {
      label: {
        "en-US": "Polish",
        es: "Polaco",
        de: "Polnisch",
      },
      value: "pl",
    },
    {
      label: {
        "en-US": "Portuguese",
        es: "Portugués",
        de: "Portugiesisch",
      },
      value: "pt",
    },
    {
      label: {
        "en-US": "Punjabi",
        es: "Panyabí",
        de: "Punjabi",
      },
      value: "pa",
    },
    {
      label: {
        "en-US": "Quechua",
        es: "Quechua",
        de: "Quechua",
      },
      value: "qu",
    },
    {
      label: {
        "en-US": "Romanian",
        es: "Rumano",
        de: "Rumänisch",
      },
      value: "ro",
    },
    {
      label: {
        "en-US": "Russian",
        es: "Ruso",
        de: "Russisch",
      },
      value: "ru",
    },
    {
      label: {
        "en-US": "Samoan",
        es: "Samoano",
        de: "Samoanisch",
      },
      value: "sm",
    },
    {
      label: {
        "en-US": "Sanskrit",
        es: "Sánscrito",
        de: "Sanskrit",
      },
      value: "sa",
    },
    {
      label: {
        "en-US": "Scots Gaelic",
        es: "Gaélico escocés",
        de: "Schottisch-Gälisch",
      },
      value: "gd",
    },
    {
      label: {
        "en-US": "Sepedi",
        es: "Sepedi",
        de: "Sepedi",
      },
      value: "nso",
    },
    {
      label: {
        "en-US": "Serbian",
        es: "Serbio",
        de: "Serbisch",
      },
      value: "sr",
    },
    {
      label: {
        "en-US": "Sesotho",
        es: "Sesotho",
        de: "Sesotho",
      },
      value: "st",
    },
    {
      label: {
        "en-US": "Shona",
        es: "Shona",
        de: "Shona",
      },
      value: "sn",
    },
    {
      label: {
        "en-US": "Sindhi",
        es: "Sindhi",
        de: "Sindhi",
      },
      value: "sd",
    },
    {
      label: {
        "en-US": "Sinhala (Sinhalese)",
        es: "Cingalés",
        de: "Singhalesisch",
      },
      value: "si",
    },
    {
      label: {
        "en-US": "Slovak",
        es: "Eslovaco",
        de: "Slowakisch",
      },
      value: "sk",
    },
    {
      label: {
        "en-US": "Slovenian",
        es: "Esloveno",
        de: "Slowenisch",
      },
      value: "sl",
    },
    {
      label: {
        "en-US": "Somali",
        es: "Somalí",
        de: "Somalisch",
      },
      value: "so",
    },
    {
      label: {
        "en-US": "Spanish",
        es: "Español",
        de: "Spanisch",
      },
      value: "es",
    },
    {
      label: {
        "en-US": "Sundanese",
        es: "Sundanés",
        de: "Sundanesisch",
      },
      value: "su",
    },
    {
      label: {
        "en-US": "Swahili",
        es: "Suajili",
        de: "Swahili",
      },
      value: "sw",
    },
    {
      label: {
        "en-US": "Swedish",
        es: "Sueco",
        de: "Schwedisch",
      },
      value: "sv",
    },
    {
      label: {
        "en-US": "Tagalog (Filipino)",
        es: "Tagalo (Filipino)",
        de: "Tagalog (Filipino)",
      },
      value: "tl",
    },
    {
      label: {
        "en-US": "Tajik",
        es: "Tayiko",
        de: "Tadschikisch",
      },
      value: "tg",
    },
    {
      label: {
        "en-US": "Tamil",
        es: "Tamil",
        de: "Tamilisch",
      },
      value: "ta",
    },
    {
      label: {
        "en-US": "Tatar",
        es: "Tártaro",
        de: "Tatarisch",
      },
      value: "tt",
    },
    {
      label: {
        "en-US": "Telugu",
        es: "Telugu",
        de: "Telugu",
      },
      value: "te",
    },
    {
      label: {
        "en-US": "Thai",
        es: "Tailandés",
        de: "Thailändisch",
      },
      value: "th",
    },
    {
      label: {
        "en-US": "Tigrinya",
        es: "Tigriña",
        de: "Tigrinya",
      },
      value: "ti",
    },
    {
      label: {
        "en-US": "Tsonga",
        es: "Tsonga",
        de: "Tsonga",
      },
      value: "ts",
    },
    {
      label: {
        "en-US": "Turkish",
        es: "Turco",
        de: "Türkisch",
      },
      value: "tr",
    },
    {
      label: {
        "en-US": "Turkmen",
        es: "Turcomano",
        de: "Turkmenisch",
      },
      value: "tk",
    },
    {
      label: {
        "en-US": "Twi (Akan)",
        es: "Twi (Akan)",
        de: "Twi (Akan)",
      },
      value: "ak",
    },
    {
      label: {
        "en-US": "Ukrainian",
        es: "Ucraniano",
        de: "Ukrainisch",
      },
      value: "uk",
    },
    {
      label: {
        "en-US": "Urdu",
        es: "Urdu",
        de: "Urdu",
      },
      value: "ur",
    },
    {
      label: {
        "en-US": "Uyghur",
        es: "Uigur",
        de: "Uigurisch",
      },
      value: "ug",
    },
    {
      label: {
        "en-US": "Uzbek",
        es: "Uzbeko",
        de: "Usbekisch",
      },
      value: "uz",
    },
    {
      label: {
        "en-US": "Vietnamese",
        es: "Vietnamita",
        de: "Vietnamesisch",
      },
      value: "vi",
    },
    {
      label: {
        "en-US": "Welsh",
        es: "Galés",
        de: "Walisisch",
      },
      value: "cy",
    },
    {
      label: {
        "en-US": "Xhosa",
        es: "Xhosa",
        de: "Xhosa",
      },
      value: "xh",
    },
    {
      label: {
        "en-US": "Yiddish",
        es: "Yidis",
        de: "Jiddisch",
      },
      value: "yi",
    },
    {
      label: {
        "en-US": "Yoruba",
        es: "Yoruba",
        de: "Yoruba",
      },
      value: "yo",
    },
    {
      label: {
        "en-US": "Zulu",
        es: "Zulú",
        de: "Zulu",
      },
      value: "zu",
    },
  ],
};
