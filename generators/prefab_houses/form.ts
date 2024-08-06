import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Text,
      label: {
        de: "Hausmodell",
        es: "Modelo de casa",
        "en-US": "House Model",
      },
      placeholder: {
        de: "Smart space-d-111",
        es: "Espacio inteligente-d-111",
        "en-US": "Smart Space-D-111",
      },
      name: "house_model",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Haustyp",
        es: "Tipo de casa",
        "en-US": "House Type",
      },
      name: "house_type",
      options: [
        {
          label: {
            de: "Einfamilienhaus",
            es: "Casa para una sola familia",
            "en-US": "Single Family House",
          },
          value: "single_family",
        },
        {
          label: {
            de: "Doppelhaus",
            es: "Casa doble",
            "en-US": "Double House",
          },
          value: "double_house",
        },
        {
          label: {
            de: "Stadthaus",
            es: "Casa adosada",
            "en-US": "Townhouse",
          },
          value: "townhouse",
        },
        {
          label: {
            de: "Duplex",
            es: "D\u00faplex",
            "en-US": "Duplex",
          },
          value: "duplex",
        },
        {
          label: {
            de: "Eigentumswohnung",
            es: "Condominio",
            "en-US": "Condominium",
          },
          value: "condominium",
        },
        {
          label: {
            de: "Wohnwagen",
            es: "Casa m\u00f3vil",
            "en-US": "Mobile Home",
          },
          value: "mobile_home",
        },
        {
          label: {
            de: "Mehrfamilienhaus",
            es: "Casa multifamiliar",
            "en-US": "Multi Family House",
          },
          value: "multi_family_house",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Gesamtfl\u00e4che (quadratfu\u00df)",
        es: "\u00c1rea total (pies cuadrados)",
        "en-US": "Total Area (Sq ft)",
      },
      placeholder: "700",
      name: "total_area",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Dachtyp",
        es: "Tipo de techo",
        "en-US": "Roof Type",
      },
      name: "roof_type",
      options: [
        {
          label: {
            de: "Flachdach",
            es: "Tejado plano",
            "en-US": "Flat Roof",
          },
          value: "flat_roof",
        },
        {
          label: {
            de: "Satteldach",
            es: "Techo a dos aguas",
            "en-US": "Gabled Roof",
          },
          value: "gabled_roof",
        },
        {
          label: {
            de: "Walmdach",
            es: "Techo a cuatro aguas",
            "en-US": "Hipped Roof",
          },
          value: "hipped_roof",
        },
        {
          label: {
            de: "Mansardendach",
            es: "Techo abuhardillado",
            "en-US": "Mansard Roof",
          },
          value: "mansard_roof",
        },
        {
          label: {
            de: "Satteldach",
            es: "Techo de silla de montar",
            "en-US": "Saddle Roof",
          },
          value: "saddle_roof",
        },
        {
          label: {
            de: "Pultdach",
            es: "Techo cubierto",
            "en-US": "Pent Roof",
          },
          value: "pent_roof",
        },
      ],
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
      min: 0,
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
      min: 0,
      max: 10,
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Energiestandard",
        es: "Est\u00e1ndar de energ\u00eda",
        "en-US": "Energy Standard",
      },
      name: "energy_standard",
      options: [
        {
          label: {
            de: "Effizienz 40",
            es: "Eficiencia 40",
            "en-US": "Efficiency 40",
          },
          value: "efficiency_40",
        },
        {
          label: {
            de: "Effizienz 55",
            es: "Eficiencia 55",
            "en-US": "Efficiency 55",
          },
          value: "efficiency_55",
        },
        {
          label: {
            de: "Effizienzhaus 40 plus",
            es: "Casa eficiencia 40 plus",
            "en-US": "Efficiency House 40 Plus",
          },
          value: "efficiency_house_40_plus",
        },
        {
          label: {
            de: "Niedrigenergiehaus",
            es: "Casa de bajo consumo",
            "en-US": "Low-energy House",
          },
          value: "niedrigenergiehaus",
        },
        {
          label: {
            de: "Plusenergiehaus",
            es: "Plusenergiehaus",
            "en-US": "Plus-energy House",
          },
          value: "plusenergiehaus",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Abschlussphase",
        es: "Etapa de finalizaci\u00f3n",
        "en-US": "Completion Stage",
      },
      name: "completion_stage",
      options: [
        {
          label: {
            de: "Bereit zum Einzug",
            es: "Listo para mudarse",
            "en-US": "Ready to Move In",
          },
          value: "ready_move_in",
        },
        {
          label: {
            de: "Bauarbeiten im Gange",
            es: "Bajo construcci\u00f3n",
            "en-US": "Under Construction",
          },
          value: "under_construction",
        },
        {
          label: {
            de: "Vorkonstruktion",
            es: "Pre construcci\u00f3n",
            "en-US": "Pre-Construction",
          },
          value: "pre_construction",
        },
        {
          label: {
            de: "Schlüsselfertig",
            es: "Listo para entregar",
            "en-US": "Turnkey",
          },
          value: "turnkey",
        },
        {
          label: {
            de: "Fast fertig",
            es: "Casi terminado",
            "en-US": "Almost Finished",
          },
          value: "almost_finished",
        },
        {
          label: {
            de: "Build-with-house",
            es: "Construir con casa",
            "en-US": "Build-With-House",
          },
          value: "build_with_house",
        },
        {
          label: {
            de: "Schl\u00fcsselfertig",
            es: "Listo para llaves",
            "en-US": "Key-ready",
          },
          value: "key_ready",
        },
        {
          label: {
            de: "Fast fertig",
            es: "Casi completo",
            "en-US": "Almost completed",
          },
          value: "almost_completed",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Price ($)",
        de: "Preis (€)",
        es: "Precio (€)",
      },
      placeholder: "310000",
      name: "price",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Standort",
        es: "Ubicaci\u00f3n",
        "en-US": "Location",
      },
      name: "location",
      options: [
        {
          label: {
            de: "Stadt",
            es: "Ciudad",
            "en-US": "City",
          },
          value: "city",
        },
        {
          label: {
            de: "Vorort",
            es: "Suburbio",
            "en-US": "Suburb",
          },
          value: "suburb",
        },
        {
          label: {
            de: "L\u00e4ndlich",
            es: "Rural",
            "en-US": "Rural",
          },
          value: "rural",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Zufriedenheitsrate",
        es: "Tasa de satisfacci\u00f3n",
        "en-US": "Satisfaction Rate",
      },
      name: "satisfaction_rate",
      options: [
        {
          label: {
            de: "Sehr schlecht",
            es: "Muy mal",
            "en-US": "Very Bad",
          },
          value: "very_bad",
        },
        {
          label: {
            de: "Schlecht",
            es: "Malo",
            "en-US": "Bad",
          },
          value: "bad",
        },
        {
          label: {
            de: "Neutral",
            es: "Neutral",
            "en-US": "Neutral",
          },
          value: "neutral",
        },
        {
          label: {
            de: "Gut",
            es: "Bien",
            "en-US": "Good",
          },
          value: "good",
        },
        {
          label: {
            de: "Exzellent",
            es: "Excelente",
            "en-US": "Excellent",
          },
          value: "excellent",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        de: "Beschreibung",
        es: "Descripci\u00f3n",
        "en-US": "Description",
      },
      placeholder: {
        de: "Geben Sie eine detaillierte Beschreibung des Hauses ein",
        es: "Introduzca una descripci\u00f3n detallada de la casa",
        "en-US": "Enter a detailed description of the house",
      },
      name: "description",
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Hinterhof einbeziehen",
        es: "Incluir patio trasero",
        "en-US": "Include Backyard",
      },
      name: "include_backyard",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Garage einschlie\u00dfen",
        es: "Incluir garaje",
        "en-US": "Include Garage",
      },
      name: "include_garage",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Hat Dachboden",
        es: "Tiene buhardilla",
        "en-US": "Has Attic",
      },
      name: "has_attic",
      checked: false,
      value: "",
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        de: "Bauart",
        es: "Tipo de construcci\u00f3n",
        "en-US": "Construction Type",
      },
      name: "construction_type",
      options: [
        {
          label: {
            de: "Traditionell",
            es: "Tradicional",
            "en-US": "Traditional",
          },
          value: "traditional",
        },
        {
          label: {
            de: "Fertighaus",
            es: "Casa prefabricada",
            "en-US": "Prefab",
          },
          value: "prefab",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        de: "Architekturkomponenten",
        es: "Componentes arquitect\u00f3nicos",
        "en-US": "Architectural Components",
      },
      name: "architectural_components",
      options: [
        {
          label: {
            de: "Dach\u00fcberstand",
            es: "Voladizo del techo",
            "en-US": "Roof Overhang",
          },
          value: "roof_overhang",
        },
        {
          label: {
            de: "Fenster-Upgrade",
            es: "Actualizaci\u00f3n de ventana",
            "en-US": "Window Upgrade",
          },
          value: "window_upgrade",
        },
        {
          label: {
            de: "Rechteckige Bucht",
            es: "Bah\u00eda rectangular",
            "en-US": "Rectangular Bay",
          },
          value: "rectangular_bay",
        },
        {
          label: {
            de: "Eingangs\u00fcberdachung",
            es: "Marquesina de entrada",
            "en-US": "Entrance Canopy",
          },
          value: "entrance_canopy",
        },
        {
          label: {
            de: "Giebel",
            es: "Gablete",
            "en-US": "Gable",
          },
          value: "gable",
        },
      ],
      value: [],
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Qualit\u00e4t der konstruktion",
        es: "Calidad de construcci\u00f3n",
        "en-US": "Quality of Construction",
      },
      name: "quality_construction",
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
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Innengr\u00f6\u00dfe",
        es: "Tama\u00f1o interior",
        "en-US": "Interior Size",
      },
      name: "interior_size",
      options: [
        {
          label: {
            de: "Klein",
            es: "Peque\u00f1o",
            "en-US": "Small",
          },
          value: "small",
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
            de: "Gro\u00df",
            es: "Grande",
            "en-US": "Large",
          },
          value: "large",
        },
      ],
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
