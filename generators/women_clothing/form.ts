import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Text,
      label: {
        de: "Artikelname",
        es: "Nombre del \u00e1rticulo",
        "en-US": "Item Name",
      },
      placeholder: {
        de: "Kleid",
        es: "Vestido",
        "en-US": "Dress",
      },
      name: "item_name",
      value: "",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        de: "Marke",
        es: "Marca",
        "en-US": "Brand",
      },
      placeholder: {
        de: "Zara",
        es: "Zara",
        "en-US": "Zara",
      },
      name: "brand",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Price ($)",
        de: "Preis (€)",
        es: "Precio (€)",
      },
      placeholder: "69.99",
      name: "price",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Farbe",
        es: "Color",
        "en-US": "Color",
      },
      name: "color",
      options: [
        {
          label: {
            de: "Blau",
            es: "Azul",
            "en-US": "Blue",
          },
          value: "blue",
        },
        {
          label: {
            de: "Rot",
            es: "Rojo",
            "en-US": "Red",
          },
          value: "red",
        },
        {
          label: {
            de: "Gr\u00fcn",
            es: "Verde",
            "en-US": "Green",
          },
          value: "green",
        },
        {
          label: {
            de: "Schwarz",
            es: "Negro",
            "en-US": "Black",
          },
          value: "black",
        },
        {
          label: {
            de: "Wei\u00df",
            es: "Blanco",
            "en-US": "White",
          },
          value: "white",
        },
        {
          label: {
            de: "Gelb",
            es: "Amarillo",
            "en-US": "Yellow",
          },
          value: "yellow",
        },
        {
          label: {
            de: "Lila",
            es: "P\u00farpura",
            "en-US": "Purple",
          },
          value: "purple",
        },
        {
          label: {
            de: "Rosa",
            es: "Rosa",
            "en-US": "Pink",
          },
          value: "pink",
        },
        {
          label: {
            de: "Dunkelantrazit",
            es: "Antracita oscuro",
            "en-US": "Dark Anthracite",
          },
          value: "dark_anthracite",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Gr\u00f6\u00dfe",
        es: "Tama\u00f1o",
        "en-US": "Size",
      },
      name: "size",
      min: 0,
      max: 20,
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        de: "Artikelbeschreibung",
        es: "Descripci\u00f3n del art\u00edculo",
        "en-US": "Item Description",
      },
      placeholder: "",
      name: "item_description",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Materialzusammensetzung",
        es: "Composici\u00f3n del material",
        "en-US": "Material Composition",
      },
      name: "material_composition",
      options: [
        {
          label: {
            de: "Polyester",
            es: "Poli\u00e9ster",
            "en-US": "Polyester",
          },
          value: "polyester",
        },
        {
          label: {
            de: "Baumwolle",
            es: "Algod\u00f3n",
            "en-US": "Cotton",
          },
          value: "cotton",
        },
        {
          label: {
            de: "Viskose",
            es: "Viscosa",
            "en-US": "Viscose",
          },
          value: "viscose",
        },
        {
          label: {
            de: "Polyamid",
            es: "Poliamida",
            "en-US": "Polyamide",
          },
          value: "polyamide",
        },
        {
          label: {
            de: "Elastan",
            es: "Spandex",
            "en-US": "Spandex",
          },
          value: "spandex",
        },
        {
          label: {
            de: "Elastan",
            es: "Elastano",
            "en-US": "Elastane",
          },
          value: "elastane",
        },
        {
          label: {
            de: "Seide",
            es: "Seda",
            "en-US": "Silk",
          },
          value: "silk",
        },
        {
          label: {
            de: "Wolle",
            es: "Lana",
            "en-US": "Wool",
          },
          value: "wool",
        },
        {
          label: {
            de: "Leder",
            es: "Cuero",
            "en-US": "Leather",
          },
          value: "leather",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Herstellungsland",
        es: "Pa\u00eds de fabricaci\u00f3n",
        "en-US": "Country of Manufacture",
      },
      name: "country_of_manufacture",
      options: [
        {
          label: {
            de: "China",
            es: "Porcelana",
            "en-US": "China",
          },
          value: "china",
        },
        {
          label: {
            de: "Marokko",
            es: "Marruecos",
            "en-US": "Morocco",
          },
          value: "morocco",
        },
        {
          label: {
            de: "Spanien",
            es: "Espa\u00f1a",
            "en-US": "Spain",
          },
          value: "spain",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Recyceltes Material",
        es: "Material reciclado",
        "en-US": "Recycled Material",
      },
      name: "recycled_material",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        de: "Waschmethode",
        es: "M\u00e9todo de lavado",
        "en-US": "Laundry Method",
      },
      name: "laundry_method",
      options: [
        {
          label: {
            de: "Maschinenw\u00e4sche",
            es: "Lavar a maquina",
            "en-US": "Machine Wash",
          },
          value: "machine_wash",
        },
        {
          label: {
            de: "Chemisch Reinigen",
            es: "Lavado en seco",
            "en-US": "Dry Clean",
          },
          value: "dry_clean",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "B\u00fcgeln",
        es: "Planchado",
        "en-US": "Ironing",
      },
      name: "ironing",
      checked: true,
      value: "",
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Dehnbarkeitsgrad des Stoffes",
        es: "Nivel de estiramiento de la tela",
        "en-US": "Fabric Stretch Level",
      },
      name: "fabric_stretch_level",
      options: [
        {
          label: {
            de: "Niedrig",
            es: "Bajo",
            "en-US": "Low",
          },
          value: "low",
        },
        {
          label: {
            de: "Mittel",
            es: "Medio",
            "en-US": "Medium",
          },
          value: "medium",
        },
        {
          label: {
            de: "Hoch",
            es: "Alto",
            "en-US": "High",
          },
          value: "high",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        de: "Geeignete Anl\u00e4sse",
        es: "Ocasiones adecuadas",
        "en-US": "Suitable Occasions",
      },
      name: "suitable_occasions",
      options: [
        {
          label: {
            de: "L\u00e4ssig",
            es: "Casual",
            "en-US": "Casual",
          },
          value: "casual",
        },
        {
          label: {
            de: "B\u00fcro",
            es: "Oficina",
            "en-US": "Office",
          },
          value: "office",
        },
        {
          label: {
            de: "Party",
            es: "Fiesta",
            "en-US": "Party",
          },
          value: "party",
        },
        {
          label: {
            de: "Tageszeit",
            es: "Tiempo de d\u00eda",
            "en-US": "Daytime",
          },
          value: "daytime",
        },
        {
          label: {
            de: "Nachts",
            es: "Noche",
            "en-US": "Nighttime",
          },
          value: "nighttime",
        },
        {
          label: {
            de: "Arbeit",
            es: "Trabajar",
            "en-US": "Work",
          },
          value: "work",
        },
      ],
      value: [],
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Bewertung",
        es: "Clasificaci\u00f3n",
        "en-US": "Rating",
      },
      name: "rating",
      min: 0,
      max: 5,
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        de: "Pflegeanleitung",
        es: "Instrucciones de cuidado",
        "en-US": "Care Instructions",
      },
      placeholder: "",
      name: "care_instructions",
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Additional information",
        es: "Informaci\u00f3n adicional",
        de: "Weitere Informationen",
      },
      placeholder: "",
      name: "additional_info",
    },
    translationsFormField,
  ];
}
