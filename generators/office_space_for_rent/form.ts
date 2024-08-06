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
        "en-US": "Enter the address of the office space",
        "en-UK": "Enter the address of the office space",
        es: "Escribe la dirección del immueble",
        de: "Geben Sie die Adresse des Büroraums an",
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
        de: "B\u00fcroname",
        es: "Nombre de la oficina",
        "en-US": "Office name",
      },
      placeholder: {
        "en-US": "Enter the name of the office space",
        "en-UK": "Enter the name of the office space",
        es: "Escriba aqui el nombre de la oficina",
        de: "Geben Sie den Namen des Büroraums ein",
      },
      name: "office_name",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Geb\u00e4udetyp",
        es: "Tipo de construcci\u00f3n",
        "en-US": "Building type",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      name: "building_type",
      required: true,
      options: [
        {
          label: {
            de: "Kein Wohngeb\u00e4ude",
            es: "No residencial",
            "en-US": "Non residential",
          },
          value: "non_residential",
        },
        {
          label: {
            de: "gemischte Nutzung",
            es: "Uso mixto",
            "en-US": "Mixed use",
          },
          value: "mixed_use",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Objektzustand",
        es: "Condici\u00f3n del immueble",
        "en-US": "Property Condition",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      name: "building_condition",
      required: true,
      options: [
        {
          label: {
            de: "Neuwertig",
            es: "Como nuevo",
            "en-US": "Like New",
          },
          value: "like_new",
        },
        {
          label: {
            de: "Erstbezug",
            es: "Primer uso",
            "en-US": "First Use",
          },
          value: "first_use",
        },
        {
          label: {
            de: "Gepflegt",
            es: "Bien conservado",
            "en-US": "Well Maintained",
          },
          value: "well_maintained",
        },
        {
          label: {
            de: "Durchschnittlich",
            es: "Normal",
            "en-US": "Average",
          },
          value: "average",
        },
        {
          label: {
            de: "Schlecht",
            es: "Mal estado",
            "en-US": "Bad condition",
          },
          value: "bad_condition",
        },
        {
          label: {
            de: "Erfordert Renovierung",
            es: "Renovacion necesaria",
            "en-US": "Requires renovation",
          },
          value: "requires_renovation",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "B\u00fcrogr\u00f6\u00dfe (qm)",
        es: "Tama\u00f1o de la oficina (m2)",
        "en-US": "Office size (sq.m)",
      },
      name: "office_size",
      value: "",
      required: true,
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        "en-US": "Occupation status",
        "en-UK": "Occupation status",
        es: "Estado de ocupación",
        de: "Besetzungsstatus",
      },
      value: "",
      name: "occupation_status",
      required: true,
      options: [
        {
          label: {
            "en-US": "Free",
            es: "Libre",
            de: "Frei",
          },
          value: "free",
        },
        {
          label: {
            "en-US": "Rented",
            es: "Alquilado",
            de: "Vermietet",
          },
          value: "rented",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Available from",
        de: "Verfügbar ab",
        es: "Disponible desde",
      },
      name: "available_from",
      value: "",
    },
    divider,
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Büroetagen",
        es: "N\u00famero de pisos del Oficina",
        "en-US": "Number of Office floors",
      },
      placeholder: "0",
      name: "number_office_floors",
      min: 1,
      max: 100,
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Number of floors in the building",
        "en-UK": "Number of floors in the building",
        es: "Número de pisos en el edificio",
        de: "Anzahl der Etagen im Gebäude",
      },
      placeholder: "0",
      value: "",
      name: "number_floors",
      min: 0,
      max: 100,
      required: true,
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Floors of the Office",
        "en-UK": "Floors of the Office",
        es: "Pisos donde la oficina esta ubicada",
        de: "Etagen der Büroräume",
      },
      placeholder: {
        "en-US": "Floor numbers separated by commas",
        "en-UK": "Floor numbers separated by commas",
        es: "Escriba que plantas ocupa la oficina separadas por comma",
        de: "Etagennummern durch Komma getrennt",
      },
      value: "",
      name: "office_space_floors",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Zimmer",
        es: "N\u00famero de habitaciones",
        "en-US": "Number of rooms",
      },
      name: "number_rooms",
      min: 1,
      max: 50,
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Toiletten pro Etage",
        es: "N\u00famero de toilets",
        "en-US": "Number of toilets per floor",
      },
      name: "number_toilets",
      min: 1,
      max: 20,
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Besprechungsräume pro Etage",
        es: "N\u00famero de salas de reuniones por planta",
        "en-US": "Number of meeting rooms per floor",
      },
      name: "number_meeting_rooms",
      min: 1,
      max: 20,
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        de: "Anzahl der Parkpl\u00e4tze",
        es: "N\u00famero de plazas de aparcamiento",
        "en-US": "Number of parking spaces",
      },
      name: "number_parking_spaces",
      min: 0,
      max: 10,
      value: "",
    },
    divider,
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Art des B\u00fcros",
        es: "Tipo de oficina",
        "en-US": "Type of office",
      },
      name: "office_type",
      required: true,
      options: [
        {
          label: {
            de: "Gro\u00dfraumb\u00fcro",
            es: "Plan abierto",
            "en-US": "Open plan",
          },
          value: "open_plan",
        },
        {
          label: {
            de: "Privat",
            es: "Privado",
            "en-US": "Private",
          },
          value: "private",
        },
        {
          label: {
            de: "Co-Working",
            es: "Trabajo colaborativo",
            "en-US": "Co-working",
          },
          value: "co_working",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Verf\u00fcgbarkeit von Parkpl\u00e4tzen",
        es: "Disponibilidad de plazas de aparcamiento",
        "en-US": "Parking spaces availability",
      },
      name: "parking_spaces_availability",
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Verf\u00fcgbarkeit des Aufzugs",
        es: "Disponibilidad de ascensores",
        "en-US": "Elevator availability",
      },
      name: "elevator_availability",
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Verf\u00fcgbarkeit von Kundentoiletten ",
        es: "Disponibilidad de ba\u00f1os",
        "en-US": "Customer Toilet Availability",
      },
      name: "customer_toilet_availability",
      value: "",
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Ger\u00e4uschpegel",
        es: "Nivel de ruido",
        "en-US": "Noise level",
      },
      name: "noise_level",
      options: [
        {
          label: {
            de: "Ruhig",
            es: "Tranquilo",
            "en-US": "Quiet",
          },
          value: "quiet",
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
            de: "Laut",
            es: "Alto",
            "en-US": "Loud",
          },
          value: "loud",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Zustand der Immobilie",
        es: "Condici\u00f3n de la propiedad",
        "en-US": "Condition of the Property",
      },
      name: "condition_property",
      options: [
        {
          label: {
            de: "Schlecht",
            es: "Pobre",
            "en-US": "Poor",
          },
          value: "poor",
        },
        {
          label: {
            de: "Durchschnittlich",
            es: "Promedio",
            "en-US": "Average",
          },
          value: "average",
        },
        {
          label: {
            de: "Gut",
            es: "Bueno",
            "en-US": "Good",
          },
          value: "good",
        },
        {
          label: {
            de: "Ausgezeichnet",
            es: "Excelente",
            "en-US": "Excellent",
          },
          value: "excellent",
        },
      ],
      value: "",
    },
    divider,
    {
      formFieldType: FormFieldType.Switch,
      label: {
        "en-US": "Furniture",
        "en-UK": "Furniture",
        es: "Muebles",
        de: "Möbel",
      },
      value: "",
      name: "furniture_status",
      required: true,
      options: [
        {
          label: {
            "en-US": "Furnished",
            es: "Amueblado",
            de: "möbliert",
          },
          value: "furnished",
        },
        {
          label: {
            "en-US": "Unfurnished",
            es: "Sin muebles",
            de: "Unmöbliert",
          },
          value: "unfurnished",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Furniture List",
        "en-UK": "Furniture List",
        es: "Muebles",
        de: "Möbel Liste",
      },
      placeholder: {
        "en-US": "Please Write or paste here your list",
        "en-UK": "Please Write or paste here your list",
        es: "Escribe o pega aqui tu lista",
        de: "Bitte schreiben oder fügen Sie hier Ihre Liste ein",
      },
      value: "",
      name: "furniture",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Kitchen type",
        "en-UK": "Kitchen type",
        es: "Tipo de cocina",
        de: "Küchentyp",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "kitchen_type",
      options: [
        {
          label: {
            "en-US": "Single kitchen",
            es: "Cocina independiente",
            de: "Einzelne Küche",
          },
          value: "single_kitchen",
        },
        {
          label: {
            "en-US": "Kitchenette",
            es: "Cocina americana",
            de: "Küchenzeile",
          },
          value: "kitchenette",
        },
        {
          label: {
            "en-US": "One or several kitchens per floor",
            es: "Una o mas cocinas por piso",
            de: "Eine oder mehrere Küchen pro Etage",
          },
          value: "one_or_several_per_floor",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Kitchen style",
        "en-UK": "Kitchen style",
        es: "Estilo de cocina",
        de: "Küchenstil",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "kitchen_style",
      options: [
        {
          label: {
            "en-US": "Farmhouse",
            es: "Rústico",
            de: "Bauernhaus",
          },
          value: "Farmhouse",
        },
        {
          label: {
            "en-US": "Contemporary",
            es: "Contemporáneo",
            de: "Zeitgenössisch",
          },
          value: "Contemporary",
        },
        {
          label: {
            "en-US": "Modern",
            es: "Moderno",
            de: "Modern",
          },
          value: "Modern",
        },
        {
          label: {
            "en-US": "Traditional",
            es: "Tradicional",
            de: "Traditionell",
          },
          value: "Traditional",
        },
        {
          label: {
            "en-US": "French",
            es: "Francés",
            de: "Französisch",
          },
          value: "French",
        },
        {
          label: {
            "en-US": "Coastal",
            es: "Costero",
            de: "Küsten",
          },
          value: "Coastal",
        },
        {
          label: {
            "en-US": "Country",
            es: "Country",
            de: "Land",
          },
          value: "Country",
        },
        {
          label: {
            "en-US": "Bohemian",
            es: "Bohemio",
            de: "Bohème",
          },
          value: "Bohemian",
        },
        {
          label: {
            "en-US": "Scandinavian",
            es: "Escandinava",
            de: "Skandinavisch",
          },
          value: "scandinavian",
        },
        {
          label: {
            "en-US": "Elegant",
            es: "Elegante",
            de: "Elegant",
          },
          value: "elegant",
        },
        {
          label: {
            "en-US": "Industrial",
            es: "Industrial",
            de: "Industriell",
          },
          value: "Industrial",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Mit Wi-Fi ausgestattet",
        es: "Equipado con wifi",
        "en-US": "Equipped with Wi-Fi",
      },
      name: "equipped_with_wifi",
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        de: "Mit Audiovisueller Technologie ausgestattet",
        es: "Equipado con tecnolog\u00eda audiovisual",
        "en-US": "Equipped with Audio-Visual Technology",
      },
      name: "equipped_with_av_tech",
      value: "",
    },
    divider,
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Window types",
        es: "Tipo de ventanas",
        de: "Fenster Art",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "window_types",
      options: [
        {
          label: {
            "en-US": "Floor to ceiling windows",
            es: "Ventanas hasta el techo",
            de: "vom Boden bis zur Decke",
          },
          value: "floor_to_ceiling",
        },
        {
          label: {
            "en-US": "Single glazed windows",
            es: "De hoja simple",
            de: "Einfach verglaste Fenster",
          },
          value: "single_gazed",
        },
        {
          label: {
            "en-US": "Double glazed windows",
            es: "Doble Hoja",
            de: "Doppelt verglaste Fenster",
          },
          value: "double_glazed",
        },
        {
          label: {
            "en-US": "Triple glazed windows",
            es: "Triple Hoja",
            de: "Dreifach verglaste Fenster",
          },
          value: "triple_glazed",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Daylight",
        es: "Luz del día",
        de: "Tageslicht",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "daylight",
      options: [
        {
          label: {
            "en-US": "Plenty",
            es: "Mucho",
            de: "Viel",
          },
          value: "plenty",
        },
        {
          label: {
            "en-US": "Average",
            es: "Promedio",
            de: "Durchschnittlich",
          },
          value: "average",
        },
        {
          label: {
            "en-US": "Little",
            es: "Poco",
            de: "Wenig",
          },
          value: "little",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        "en-US": "Type of Views",
        es: "Tipo de Vistas",
        de: "Art der Aussicht",
      },
      value: [],
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      name: "type_of_views",
      options: [
        {
          label: {
            "en-US": "Views to the Garden",
            es: "Vistas al Jardín",
            de: "Gartenblick",
          },
          value: "garden_view",
        },
        {
          label: {
            "en-US": "Views to the street",
            es: "Vistas a la Calle",
            de: "Straßenblick",
          },
          value: "street_view",
        },
        {
          label: {
            "en-US": "Views to internal courtyard",
            es: "Vistas a patio interior",
            de: "Blick auf den Innenhof",
          },
          value: "courtyard_view",
        },
        {
          label: {
            "en-US": "Views to the nature",
            es: "Vistas a la naturaleza",
            de: "Ausblick in die Natur",
          },
          value: "nature_view",
        },
        {
          label: {
            "en-US": "without views",
            es: "Sin vistas",
            de: "ohne Ausblick",
          },
          value: "without_view",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Quality of Views",
        es: "Calidad de las Vistas",
        de: "Qualität der Aussicht",
      },
      value: "",
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      name: "quality_of_views",
      options: [
        {
          label: {
            "en-US": "Extraordinary",
            es: "Extraordinarias",
            de: "Außergewöhnlich",
          },
          value: "extraordinary",
        },
        {
          label: {
            "en-US": "beautiful",
            es: "Bonitas",
            de: "Schön",
          },
          value: "beautiful",
        },
        {
          label: {
            "en-US": "Average",
            es: "Normales",
            de: "Durchschnittlich",
          },
          value: "average",
        },
        {
          label: {
            "en-US": "Below average",
            es: "No destacables",
            de: "Unterdurchschnittlich",
          },
          value: "below_average",
        },
      ],
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Balconies",
        "en-UK": "Balconies",
        es: "Balcones",
        de: "Balkone",
      },
      placeholder: "0",
      value: "",
      name: "number_balconies",
      min: 0,
      max: 40,
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Terrace",
        "en-UK": "Terrace",
        es: "Terraza",
        de: "Terrasse",
      },
      placeholder: "0",
      value: "",
      name: "number_terrace",
      min: 0,
      max: 40,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Garden size (sqm)",
        "en-UK": "Garden size (sqm)",
        es: "Tamaño del jardín (m2) ",
        de: "Gartengröße (m2)",
      },
      placeholder: "",
      value: "",
      name: "garden_size",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Number of chimneys",
        "en-UK": "Number of chimneys",
        es: "Número de chimeneas",
        de: "Anzahl der Kamine",
      },
      placeholder: "0",
      value: "",
      name: "number_of_chimneys",
      min: 0,
      max: 10,
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Highlights",
        "en-UK": "Highlights",
        es: "Aspectos destacados",
        de: "Besonderheiten",
      },
      placeholder: {
        "en-US": "Write or paste free text here",
        "en-UK": "Write or paste free text here",
        es: "Escribe o pega aqui tu explicación",
        de: "Hier freien Text schreiben oder einfügen",
      },
      value: "",
      name: "highlights",
    },
    divider,
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Energy certificate",
        "en-UK": "Energy certificate",
        es: "Certificado de energía",
        de: "Energieausweis",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "energy_certificate",
      required: true,
      options: [
        {
          label: {
            "en-US": "Demand certificate",
            es: "Certificado de demanda",
            de: "Bedarfsausweis",
          },
          value: "Demand certificate",
        },
        {
          label: {
            "en-US": "Usage certificate",
            es: "Certificado de uso",
            de: "Verbrauchsausweis",
          },
          value: "Usage certificate",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Validity till",
        "en-UK": "Validity till",
        es: "Validez hasta",
        de: "Gültig bis",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "energy_certificate_validity_till",
      options: [
        ...new Array(12).fill(undefined).map((item, index) => {
          let label = new Date().getFullYear() + index;
          return {
            label,
            value: label,
          };
        }),
        {
          label: {
            "en-US": "Expired",
            es: "Expirado",
            de: "Abgelaufen",
          },
          value: "expired",
        },
        {
          label: {
            "en-US": "Expired, renewal requested",
            es: "Expirado, renovación solicitada",
            de: "Abgelaufen, Erneuerung angefordert",
          },
          value: "expired, renewal requested",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Heating type",
        "en-UK": "Heating type",
        es: "Tipo de calefacción",
        de: "Heizungsart",
      },
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      value: "",
      name: "heating_type",
      required: true,
      options: [
        {
          label: {
            "en-US": "Central - Furnace",
            es: "Central - Horno",
            de: "Zentral - Ofen",
          },
          value: "Central - Furnace",
        },
        {
          label: {
            "en-US": "Central - Boiler",
            es: "Central - Caldera",
            de: "Zentral - Boiler",
          },
          value: "Central - Boiler",
        },
        {
          label: {
            "en-US": "Central - Heat pump",
            es: "Central - Bomba de calor",
            de: "Zentral - Wärmepumpe",
          },
          value: "Central - Heat pump",
        },
        {
          label: {
            "en-US": "Gas Fired",
            es: "Alimentado por Gas",
            de: "Gasheizung",
          },
          value: "Gas Fired",
        },
        {
          label: {
            "en-US": "Unvented gas fired",
            es: "Alimentado por Gas sin Ventilación",
            de: "Ungenutzte Gasheizung",
          },
          value: "Unvented gas fired",
        },
        {
          label: {
            "en-US": "Electric",
            es: "Eléctrico",
            de: "Elektrisch",
          },
          value: "Electric",
        },
        {
          label: {
            "en-US": "Wood burning",
            es: "Quemado de Madera",
            de: "Holzverbrennung",
          },
          value: "Wood burning",
        },
        {
          label: {
            "en-US": "Pellets",
            es: "Pellets",
            de: "Pellets",
          },
          value: "Pellets",
        },
        {
          label: {
            "en-US": "Fireplace",
            es: "Chimenea",
            de: "Kamin",
          },
          value: "Fireplace",
        },
        {
          label: {
            "en-US": "Radiant floor heat",
            es: "Calefacción por Suelo Radiante",
            de: "Fußbodenheizung",
          },
          value: "Radiant floor heat",
        },
        {
          label: {
            "en-US": "Ductwork",
            es: "Conductos",
            de: "Leitungsnetz",
          },
          value: "Ductwork",
        },
        {
          label: {
            "en-US": "Combined heat and power",
            es: "Calor y Energía Combinados",
            de: "Kraft-Wärme-Kopplung",
          },
          value: "Combined heat and power",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Slider,
      label: {
        de: "Energieeffizienzklasse",
        es: "Clase de eficiencia energ\u00e9tica",
        "en-US": "Energy Efficiency Class",
      },
      name: "energy_efficiency_class",
      required: true,
      options: [
        {
          label: {
            de: "A+",
            es: "A+",
            "en-US": "A+",
          },
          value: "A+",
        },
        {
          label: {
            de: "A",
            es: "A",
            "en-US": "A",
          },
          value: "A",
        },
        {
          label: {
            de: "B",
            es: "B",
            "en-US": "B",
          },
          value: "B",
        },
        {
          label: {
            de: "C",
            es: "C",
            "en-US": "C",
          },
          value: "C",
        },
        {
          label: {
            de: "D",
            es: "D",
            "en-US": "D",
          },
          value: "D",
        },
        {
          label: {
            de: "E",
            es: "Y",
            "en-US": "E",
          },
          value: "E",
        },
        {
          label: {
            de: "F",
            es: "F",
            "en-US": "F",
          },
          value: "F",
        },
        {
          label: {
            de: "G",
            es: "G",
            "en-US": "G",
          },
          value: "G",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Essential energy source",
        "en-UK": "Essential energy source",
        es: "Fuente de energía esencial",
        de: "Wesentliche Energiequelle",
      },
      placeholder: {
        "en-US": "Electric",
        es: "Eléctrico",
        de: "Elektrisch",
      },
      value: "",
      name: "essential_energy_source",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Endenergieverbrauch (W\u00e4rme)",
        es: "Consumo final de energ\u00eda (calor)",
        "en-US": "End energy consumption (heat)",
      },
      placeholder: "91",
      name: "end_energy_consumption_heat",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Endenergieverbrauch (Strom)",
        es: "Consumo final de energ\u00eda (electricidad)",
        "en-US": "End energy consumption (electricity)",
      },
      placeholder: "23",
      name: "end_energy_consumption_electricity",
      value: "",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Year of construction according to certificate",
        "en-UK": "Year of construction according to certificate",
        es: "Año de construcción según certificado",
        de: "Baujahr laut Zertifikat",
      },
      placeholder: "",
      value: "",
      name: "year_of_construction_according_to_certificate",
    },
    divider,
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Kaltmiete (\u20ac)",
        es: "Alquiler fr\u00edo (\u20ac)",
        "en-US": "Cold Rent (\u20ac)",
      },
      name: "rent",
      value: "",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Price per Square Meter ($/m\u00b2)",
        de: "Preis/m\u00b2 (€/m\u00b2)",
        es: "Precio por metro cuadrado (€/m\u00b2)",
      },
      name: "price_per_sqm",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Gesamtmiete (\u20ac)",
        es: "Renta total (\u20ac)",
        "en-US": "Total Rent (\u20ac)",
      },
      name: "total_rent",
      value: "",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Kaution oder Genossenschaftsanteile (\u20ac)",
        es: "Dep\u00f3sito o acciones cooperativas (\u20ac)",
        "en-US": "Deposit or Cooperative Shares (\u20ac)",
      },
      name: "deposit",
      value: "",
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        "en-US": "Service and Common Costs pre-payment",
        "en-UK": "Service and Common Costs pre-payment",
        es: "Costes de Servicios y pago",
        de: "Nebenkosten zahlung",
      },
      value: "",
      name: "service_costs",
      options: [
        {
          label: {
            "en-US": "Paid in advance",
            es: "Se pagan con antelacion",
            de: "Nebenkostenvorauszahlung",
          },
          value: "paid_in_advanced",
        },
        {
          label: {
            "en-US": "Flat rate",
            es: "tarifa fija",
            de: "Nebenkostenpauschale",
          },
          value: "flat rate",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Betrag (\u20ac)",
        es: "Total (\u20ac) ",
        "en-US": "Amount (\u20ac)",
      },
      name: "amount_service_costs",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Miete f\u00fcr Garage/Stellplatz (\u20ac)",
        es: "Renta de garaje/plaza de parking (\u20ac)",
        "en-US": "Rent for Garage/Parking Space (\u20ac)",
      },
      name: "parking_fees",
      value: "",
    },
    divider,
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        de: "Weitere Einzelheiten",
        es: "Detalles adicionales",
        "en-US": "Additional details",
      },
      placeholder: {
        de: "Weitere Einzelheiten. Als Aufzählungsliste hinzufügen",
        es: "Escriba aquí una lista de detalles adicionales",
        "en-US": "Write or paste a list of addiitonal details here",
        "en-UK": "Write or paste a list of additional details here",
      },
      name: "additional_details",
      value: "",
    },
    divider,
    translationsFormField,
  ];
}
