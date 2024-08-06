import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Address,
      label: {
        "en-US": "Property address",
        "en-UK": "Property address",
        es: "Dirección de la propiedad",
        de: "Adresse der Immobilie",
      },
      placeholder: {
        "en-US": "1600 Pennsylvania Avenue NW Washington, D.C. 20500",
        "en-UK": "42 Elm Street London WC2N 5DU United Kingdom",
        es: "Calle de la Paloma, 15 28013 Madrid Spain",
        de: "Mühlbruchstraße 13, 60594 Frankfurt am Main",
      },
      value: "",
      name: "address",
      required: true,
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Don't show exact address",
        "en-UK": "Don't show exact address",
        es: "No mostrar dirección exacta",
        de: "Genaue Adresse nicht anzeigen",
      },
      name: "dont_show_exact_address",
      checked: true,
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        de: "Name der Gemeinschaft",
        es: "Nombre de la comunidad",
        "en-US": "Community Name",
      },
      placeholder: {
        de: "Manhasset Crest",
        es: "Cresta de manhasset",
        "en-US": "Manhasset Crest",
      },
      name: "community_name",
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        de: "Gemeinschaftsbeschreibung",
        es: "Descripci\u00f3n de la comunidad",
        "en-US": "Community Description",
      },
      placeholder: {
        de: "Geben Sie die Gemeinschaftsbeschreibung ein",
        es: "Ingrese la descripci\u00f3n de la comunidad",
        "en-US": "Enter community description",
      },
      name: "community_description",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Anzahl der H\u00e4user",
        es: "N\u00famero de viviendas",
        "en-US": "Number of Homes",
      },
      placeholder: "46",
      name: "number_homes",
      value: "",
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        de: "Geschlossene Gemeinschaft",
        es: "Comunidad cerrada",
        "en-US": "Gated Community",
      },
      name: "gated_community",
      options: [
        {
          label: {
            de: "Ja",
            es: "S\u00ed",
            "en-US": "Yes",
          },
          value: "yes",
        },
        {
          label: {
            de: "Nein",
            es: "No",
            "en-US": "No",
          },
          value: "no",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Gemeinschaftstyp",
        es: "Tipo de comunidad",
        "en-US": "Community Type",
      },
      name: "community_type",
      options: [
        {
          label: {
            de: "Einfamilienh\u00e4user",
            es: "Viviendas unifamiliares",
            "en-US": "Single-Family Homes",
          },
          value: "single_family_homes",
        },
        {
          label: {
            de: "Stadth\u00e4user",
            es: "Casas adosadas",
            "en-US": "Townhomes",
          },
          value: "townhomes",
        },
        {
          label: {
            de: "Eigentumswohnungen",
            es: "Condominios",
            "en-US": "Condominiums",
          },
          value: "condominiums",
        },
        {
          label: {
            de: "Kutschenstil H\u00e4user",
            es: "Casas estilo carruaje",
            "en-US": "Carriage-Style Homes",
          },
          value: "carriage_style_homes",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        de: "Schulbezirk",
        es: "Distrito escolar",
        "en-US": "School District",
      },
      placeholder: {
        de: "Manhasset Union Free School District",
        es: "Distrito escolar libre de la uni\u00f3n de manhasset",
        "en-US": "Manhasset Union Free School District",
      },
      name: "school_district",
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Schlafzimmer",
        es: "Numero de habitaciones",
        "en-US": "Number of Bedrooms",
      },
      name: "number_bedrooms",
      min: 1,
      max: 10,
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Badezimmer",
        es: "Cantidad de ba\u00f1os",
        "en-US": "Number of Bathrooms",
      },
      name: "number_bathrooms",
      min: 1,
      max: 10,
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Fl\u00e4che (in Quadratfu\u00df)",
        es: "\u00c1rea (en pies cuadrados)",
        "en-US": "Area (in sq ft)",
      },
      placeholder: "2800",
      name: "area_sqft",
      value: "",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        de: "Ausstattung",
        es: "Comodidades",
        "en-US": "Amenities",
      },
      name: "amenities",
      options: [
        {
          label: {
            de: "Clubhaus",
            es: "Casa club",
            "en-US": "Clubhouse",
          },
          value: "clubhouse",
        },
        {
          label: {
            de: "Fitnesscenter",
            es: "Gimnasio",
            "en-US": "Fitness Center",
          },
          value: "fitness_center",
        },
        {
          label: {
            de: "Au\u00dfenpool",
            es: "Piscina al aire libre",
            "en-US": "Outdoor Pool",
          },
          value: "outdoor_pool",
        },
        {
          label: {
            de: "Spazierwege",
            es: "Senderos",
            "en-US": "Walking Trails",
          },
          value: "walking_trails",
        },
        {
          label: {
            de: "Soziale Lounge",
            es: "Sal\u00f3n social",
            "en-US": "Social Lounge",
          },
          value: "social_lounge",
        },
        {
          label: {
            de: "Spielplatz",
            es: "Patio de juegos",
            "en-US": "Playground",
          },
          value: "playground",
        },
      ],
      value: [],
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Entfernung zum Einkaufen (Meilen)",
        es: "Distancia a las tiendas (millas)",
        "en-US": "Distance to Shopping (miles)",
      },
      placeholder: "2",
      name: "distance_shopping",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Entfernung zum Essen (Meilen)",
        es: "Distancia al comedor (millas)",
        "en-US": "Distance to Dining (miles)",
      },
      placeholder: "2",
      name: "distance_dining",
      value: "",
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "N\u00e4he zu Verkehrsmitteln",
        es: "Proximidad al transporte",
        "en-US": "Proximity to Transportation",
      },
      name: "proximity_transportation",
      options: [
        {
          label: {
            de: "Weit",
            es: "Lejos",
            "en-US": "Far",
          },
          value: "far",
        },
        {
          label: {
            de: "M\u00e4\u00dfig",
            es: "Moderado",
            "en-US": "Moderate",
          },
          value: "moderate",
        },
        {
          label: {
            de: "Nah",
            es: "Cerca",
            "en-US": "Close",
          },
          value: "close",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "In der N\u00e4he des Parks",
        es: "Cerca del parque",
        "en-US": "Near Park",
      },
      name: "near_park",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Gibt es eine Hausbesitzervereinigung?",
        es: "\u00bfexiste una comunidad de propietarios?",
        "en-US": "Is there a Homeowner's Association?",
      },
      name: "is_hoa",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Garage inklusive",
        es: "Garaje incluido",
        "en-US": "Garage Included",
      },
      name: "garage_included",
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Parkplatz verf\u00fcgbar",
        es: "Estacionamiento disponible",
        "en-US": "Parking Available",
      },
      name: "parking_available",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        de: "Nahegelegene Einrichtungen",
        es: "Instalaciones cercanas",
        "en-US": "Nearby Facilities",
      },
      name: "nearby_facilities",
      options: [
        {
          label: {
            de: "Schule",
            es: "Escuela",
            "en-US": "School",
          },
          value: "school",
        },
        {
          label: {
            de: "Einkaufszentrum",
            es: "Centro comercial",
            "en-US": "Shopping Mall",
          },
          value: "shopping_mall",
        },
        {
          label: {
            de: "Park",
            es: "Parque",
            "en-US": "Park",
          },
          value: "park",
        },
        {
          label: {
            de: "Krankenhaus",
            es: "Hospital",
            "en-US": "Hospital",
          },
          value: "hospital",
        },
        {
          label: {
            de: "\u00d6ffentliche Verkehrsmittel",
            es: "Transporte p\u00fablico",
            "en-US": "Public Transport",
          },
          value: "public_transport",
        },
      ],
      value: [],
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
