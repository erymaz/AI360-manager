import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

const divider = {
  formFieldType: FormFieldType.Divider,
  name: "",
  label: "",
};

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
      required: true,
      name: "address",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Don't show exact address",
        "en-UK": "Don't show exact address",
        es: "No mostrar dirección exacta",
        de: "Genauen Adresse nicht anzeigen",
      },
      name: "dont_show_exact_address",
      checked: true,
    },
    {
      formFieldType: FormFieldType.Group,
      label: {
        "en-US": "Public transportation",
        "en-UK": "Public transportation",
        es: "Transporte público",
        de: "Öffentlicher Verkehr",
      },
      name: "public_transportation",
      fields: [
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Bus - Show in description within this range (km)",
            "en-UK": "Bus - Show in description within this range (km)",
            es: "Bus - Mostrar en la descripción dentro de este rango (km)",
            "de":
              "Bus - Zeigen Sie in der Beschreibung innerhalb dieses Bereichs (km)",
          },
          placeholder: "10",
          value: "10",
          name: "bus_range",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Subway - Show in description within this range (km)",
            "en-UK": "Metro - Show in description within this range (km)",
            es: "Metro - Mostrar en la descripción dentro de este rango (km)",
            "de":
              "U-Bahn - Zeigen Sie in der Beschreibung innerhalb dieses Bereichs (km)",
          },
          placeholder: "10",
          value: "10",
          name: "metro_range",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Main train station (km)",
            "en-UK": "Main train station (km)",
            es: "Estación principal de tren (km)",
            de: "Hauptbahnhof (km)",
          },
          placeholder: "10",
          value: "10",
          name: "train_range",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Main Airport (km)",
            "en-UK": "Main Airport (km)",
            es: "Aeropuerto principal (km)",
            de: "Hauptflughafen (km)",
          },
          placeholder: "30",
          value: "30",
          name: "airport_range",
          options: [
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "20", value: "20" },
            { label: "30", value: "30" },
            { label: "40", value: "40" },
            { label: "50", value: "50" },
            { label: "60", value: "60" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
      ],
    },
    {
      formFieldType: FormFieldType.Group,
      label: {
        "en-US": "Places and Interests",
        "en-UK": "Places and Interests",
        es: "Lugares e intereses",
        de: "Orte und Interessen",
      },
      name: "places_interests",
      fields: [
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Food and Restaurants (km)",
            "en-UK": "Food and Restaurants (km)",
            es: "Comida y restaurantes (km)",
            de: "Essen und Restaurants (km)",
          },
          placeholder: "10",
          value: "10",
          name: "food_restaurant",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Supermarkets (km)",
            "en-UK": "Supermarkets (km)",
            es: "Supermercados (km)",
            de: "Supermärkte (km)",
          },
          placeholder: "10",
          value: "10",
          name: "supermarkets",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Schools (km)",
            "en-UK": "Schools (km)",
            es: "Escuelas (km)",
            de: "Schulen (km)",
          },
          placeholder: "10",
          value: "10",
          name: "schools",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Arts & Culture (km)",
            "en-UK": "Arts & Culture (km)",
            es: "Arte y cultura (km)",
            de: "Kunst & Kultur (km)",
          },
          placeholder: "10",
          value: "10",
          name: "arts_culture",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Parks & Green Areas (km)",
            "en-UK": "Parks & Green Areas (km)",
            es: "Parques y áreas verdes (km)",
            de: "Parks & Grüne Flächen (km)",
          },
          placeholder: "10",
          value: "10",
          name: "parks_green_areas",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Hospitals & Medical (km)",
            "en-UK": "Hospitals & Medical (km)",
            es: "Hospitales & médicos (km)",
            de: "Krankenhäuser & Medizinisch (km)",
          },
          placeholder: "10",
          value: "10",
          name: "hospitals_medical",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
      ],
    },
    {
      formFieldType: FormFieldType.Group,
      label: {
        "en-US": "Accomodation",
        "en-UK": "Accomodation",
        es: "Alojamiento",
        de: "Unterkunft",
      },
      name: "staying",
      fields: [
        {
          formFieldType: FormFieldType.Slider,
          label: {
            "en-US": "Hotels (km)",
            "en-UK": "Hotels (km)",
            es: "Hoteles (km)",
            de: "Hotels (km)",
          },
          placeholder: "10",
          value: "10",
          name: "hotels",
          options: [
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "35", value: "35" },
            {
              label: {
                "en-US": "Don't show",
                es: "No mostrar",
                de: "Nicht anzeigen",
              },
              value: "dont_show",
            },
          ],
        },
      ],
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Provide an embeddable Google link with the map and location",
        "en-UK": "Provide an embeddable Google link with the map and location",
        es: "Proporcionarme un enlace de Google incrustable con el mapa y la ubicación",
        "de":
          "Geben Sie mir einen einbettbaren Google-Link mit der Karte und dem Standort",
      },
      name: "embeddable_google_link",
      checked: false,
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US":
          "Provide me a result that displays this information only as a list",
        "en-UK":
          "Provide me a result that displays this information only as a list",
        es: "Proporcionarme un resultado que proporcione esta información solo como lista",
        "de":
          "Liefern Sie mir ein Ergebnis, das diese Informationen nur als Liste anzeigt",
      },
      name: "poi_list_only",
      checked: false,
    },
    translationsFormField,
  ];
}
