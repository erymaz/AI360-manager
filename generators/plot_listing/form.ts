import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Address,
      label: {
        "en-US": "Address",
        "en-UK": "Address",
        es: "Dirección",
        de: "Adresse",
      },
      placeholder: {
        "en-US": "Enter the address of the plot",
        "en-UK": "Enter the address of the plot",
        es: "Escribe la dirección del solar",
        de: "Geben Sie die Adresse des Grundstücks",
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
      required: true,
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        "en-US": "Condition of plot",
        "en-UK": "Condition of plot",
        es: "Condición de la parcela",
        de: "Zustand des Grundstücks",
      },
      name: "condition",
      options: [
        {
          label: {
            "en-US": "Undeveloped plot",
            es: "Parcela sin desarrollar",
            de: "Unerschlossenes Grundstück",
          },
          value: "undeveloped",
        },
        {
          label: {
            "en-US": "Developed plot",
            es: "Parcela desarrollada",
            de: "Erschlossenes Grundstück",
          },
          value: "developed",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Type of plot",
        "en-UK": "Type of plot",
        es: "Tipo de parcela",
        de: "Art des Grundstücks",
      },
      name: "type",
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      required: true,
      options: [
        {
          label: {
            "en-US": "Building land",
            es: "Terreno para construcción",
            de: "Bauland",
          },
          value: "building",
        },
        {
          label: {
            "en-US": "Building maintenance land",
            es: "Terreno para mantenimiento de edificios",
            de: "Gebäudeerhaltungsland",
          },
          value: "building_maintenance",
        },
        {
          label: {
            "en-US": "Farmland",
            es: "Tierra de cultivo",
            de: "Ackerland",
          },
          value: "farm",
        }
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Landarea (sq meter)",
        "en-UK": "Landarea (sq meter)",
        es: "Área de la tierra (m²)",
        de: "Grundstücksfläche (m²)",
      },
      name: "landarea",
      value: "",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Landarea divisible from / Minimum lot size (sq meter)",
        "en-UK": "Landarea divisible from / Minimum lot size (sq meter)",
        es: "Área de la tierra divisible desde / Tamaño mínimo del lote (m²)",
        de: "Grundstücksfläche abteilbar von / Mindestgrundstücksgröße (m²)",
      },
      placeholder: "100",
      name: "min_lot_size",
      value: "",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        "en-US": "Recommended usage",
        "en-UK": "Recommended usage",
        es: "Uso recomendado",
        de: "Empfohlene Nutzung",
      },
      name: "usage",
      placeholder: {
        "en-US": "Select one or more options",
        "en-UK": "Select one or more options",
        es: "Elige una o mas",
        de: "Wählen Sie eine oder mehrere Optionen",
      },
      options: [
        {
          label: {
            "en-US": "Forest",
            es: "Bosque",
            de: "Wald",
          },
          value: "forest",
        },
        {
          label: {
            "en-US": "Garden",
            es: "Jardín",
            de: "Garten",
          },
          value: "garden",
        },
        {
          label: {
            "en-US": "Farmland",
            es: "Tierra de cultivo",
            de: "Ackerland",
          },
          value: "farmland",
        },
        {
          label: {
            "en-US": "Apartment building",
            es: "Edificio de apartamentos",
            de: "Wohngebäude",
          },
          value: "apartment_building",
        },
        {
          label: {
            "en-US": "Detached house",
            es: "Casa independiente",
            de: "Einfamilienhaus",
          },
          value: "detached_house",
        },
        {
          label: {
            "en-US": "Semi detached house",
            es: "Casa adosada",
            de: "Doppelhaushälfte",
          },
          value: "semi_detached_house",
        },
        {
          label: {
            "en-US": "Townhouse",
            es: "Casa de pueblo",
            de: "Stadthaus",
          },
          value: "townhouse",
        },
        {
          label: {
            "en-US": "Bungalow",
            es: "Bungalow",
            de: "Bungalow",
          },
          value: "bungalow",
        }
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Available from",
        "en-UK": "Available from",
        es: "Disponible desde",
        de: "Verfügbar ab",
      },
      placeholder: "2023",
      value: "",
      name: "available_from",
      min: 2023,
      max: 2050,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Total price ($)",
        "en-UK": "Total price (£)",
        es: "Precio total (€)",
        de: "Gesamtpreis (€)",
      },
      placeholder: {
        "en-US": "1,000,000",
        "en-UK": "1,000,000",
        es: "1.000.000",
        de: "1.000.000",
      },
      name: "total_price",
      value: "",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Price/sqm² ($)",
        "en-UK": "Price/sqm² (£)",
        es: "Precio/m² (€)",
        de: "Preis/m² (€)",
      },
      placeholder: {
        "en-US": "5,000",
        "en-UK": "5,000",
        es: "5.000",
        de: "5.000",
      },
      name: "price_per_sq_meter",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Commission for the buyer (%)",
        "en-UK": "Commission for the buyer (%)",
        es: "Comisión para el comprador (%)",
        de: "Provision für den Käufer (%)",
      },
      name: "commission",
      min: 0,
      max: 100,
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Description of the plot",
        "en-UK": "Description of the plot",
        es: "Descripción de la parcela",
        de: "Beschreibung des Grundstücks",
      },
      placeholder: {
        "en-US": "Please write your description here",
        es: "Por favor, escriba su descripción aquí",
        de: "Bitte schreiben oder fügen Sie Ihre Beschreibung hier ein",
      },
      name: "description",
      value: "",
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        "en-US": "Satisfaction rate of the location",
        "en-UK": "Satisfaction rate of the location",
        es: "Tasa de satisfacción de la ubicación",
        de: "Zufriedenheitsrate des Standorts",
      },
      name: "satisfaction",
      options: [
        {
          label: {
            "en-US": " Very bad",
            es: "Muy malo",
            de: "Sehr schlecht",
          },
          value: "very_bad",
        },
        {
          label: {
            "en-US": "Bad",
            es: "Malo",
            de: "Schlecht",
          },
          value: "bad",
        },
        {
          label: {
            "en-US": "Neutral",
            es: "Neutral",
            de: "Neutral",
          },
          value: "neutral",
        },
        {
          label: {
            "en-US": "Good",
            es: "Bueno",
            de: "Gut",
          },
          value: "good",
        },
        {
          label: {
            "en-US": "Excellent",
            es: "Excelente",
            de: "Ausgezeichnet",
          },
          value: "excellent",
        }
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Further information",
        "en-UK": "Further information",
        es: "Información adicional",
        de: "Weitere Informationen",
      },
      placeholder: {
        "en-US": "Please write or paste additional information here",
        es: "Por favor, escriba su descripción aquí",
        de: "Bitte schreiben oder fügen Sie hier zusätzliche Informationen ein",
      },
      name: "further_info",
      value: "",
      required: true,
    },
    translationsFormField,
  ];
}
