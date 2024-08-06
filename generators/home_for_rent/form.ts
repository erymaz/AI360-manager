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
      formFieldType: FormFieldType.Dropdown,
      label: {
        de: "Was möchten Sie über diese Immobilie erzählen? Dies ist eine...",
        es: "¿Qué quieres contarnos de esta propiedad?",
        "en-US": "What you would like to say about this property? It's a...",
      },
      name: "tone",
      required: true,
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      options: [
        {
          label: {
            de: "solide Immobilien",
            es: "Propiedades sólidas - características aceptables/ sin particularidades/ equipo simple/ nada nuevo",
            "en-US": "Solid property",
          },
          value: "solid_properties",
        },
        {
          label: {
            de: "Gute/ gepflegte Immobilie",
            es: "Buena propiedad",
            "en-US": "Good/ well-maintained property",
          },
          value: "good_properties",
        },
        {
          label: {
            de: "Anspruchsvolle/ exklusive/ qualitativ hochwertigere Immobilie",
            es: "Propiedades de calidad exigente/ de mayor calidad pero no de lujo o de clase alta/ exclusivas",
            "en-US": "Property with demanding/ exclusive/ higher quality",
          },
          value: "demanding_quality_properties",
        },
        {
          label: {
            de: "Erstklassige/ hochqualitative/ luxuriöse Immobilie",
            es: "Propiedad de alta clase - equipo de lujo/ extravagante/ muy alta calidad/ sin defectos",
            "en-US": "High class/ high quality/ luxurious property",
          },
          value: "high_class_properties",
        },
        {
          label: {
            de: "Renovierte/ sanierte Immobilie",
            es: "Propiedades renovadas",
            "en-US": "Renovated/ refurbished property",
          },
          value: "renovated_properties",
        },
        {
          label: {
            de: "Modernisierte Immobilie",
            es: "Propiedades modernizadas",
            "en-US": "Modernized property",
          },
          value: "modernized_properties",
        },
        {
          label: {
            de: "Neubau Immobilie",
            es: "Propiedades de nueva construcción",
            "en-US": "New build Property",
          },
          value: "new_build_properties",
        },
        {
          label: {
            de: "Dachgeschoss Immobilie",
            es: "Propiedades en el ático",
            "en-US": "Attic Property",
          },
          value: "attic_properties",
        },
        {
          label: {
            de: "Immobilien mit besonderen Eigenschaften",
            es: "Propiedades con características especiales",
            "en-US": "Properties with special features",
          },
          value: "special_features_properties",
        },
        {
          label: {
            de: "Haus zur Miete",
            es: "Casa en alquiler",
            "en-US": "House for rent",
          },
          value: "houses_for_rent",
        },
        {
          label: {
            de: "Immobilie in besonderer Lage",
            es: "Propiedades en áreas especiales",
            "en-US": "Property in special area",
          },
          value: "special_areas_properties",
        },
        {
          label: {
            de: "1-Zimmer-Wohnung/ Single-Wohnung/ Apartment",
            es: "Un Estudio",
            "en-US": "One room apartment/ Singleflat/ Apartement",
          },
          value: "one_room_apartment",
        },
        {
          label: {
            de: "Renovierungsbedürftige Immobilie",
            es: "Propiedad en necesidad de renovación",
            "en-US": "Property in need of renovation",
          },
          value: "renovation_needed_properties",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Address,
      label: {
        "en-US": "Property address",
        "en-UK": "Property address",
        es: "Dirección de la propiedad",
        de: "Adresse der Immobilie",
      },
      placeholder: {
        "en-US": "Enter the address of the property",
        "en-UK": "Enter the address of the property",
        es: "Escribe la dirección del immueble",
        de: "Geben Sie die Adresse der Immobilie ein",
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
        de: "Zeige genaue Adresse nicht an",
      },
      name: "dont_show_exact_address",
      checked: true,
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Property type",
        "en-UK": "Property type",
        es: "Tipo de propiedad",
        de: "Immobilientyp",
      },
      value: "",
      name: "property_type",
      required: true,
      placeholder: {
        "en-US": "Please select",
        "en-UK": "Please select",
        es: "elige una opción",
        de: "Bitte auswählen",
      },
      options: [
        {
          label: {
            "en-US": "House",
            es: "Casa",
            de: "Haus",
          },
          value: "house",
        },
        {
          label: {
            "en-US": "Apartment",
            es: "Apartamento",
            de: "Wohnung",
          },
          value: "apartment",
        },
        {
          label: {
            "en-US": "Bungalow",
            es: "Bungalow",
            de: "Bungalow",
          },
          value: "bungalow",
        },
        {
          label: {
            "en-US": "Semi-detached house",
            es: "Casa adosada",
            de: "Doppelhaushälfte",
          },
          value: "semi_detached_house",
        },
        {
          label: {
            "en-US": "Granny Flat",
            es: "Piso de invitados",
            de: "Einliegerwohnung",
          },
          value: "granny_flat",
        },
      ],
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        "en-US": "Occupation status",
        "en-UK": "Occupation status",
        es: "Estado de ocupación",
        de: "Belegungsstatus",
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
    divider,
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Sq meter",
        "en-UK": "Sq meter",
        es: "Metros cuadrados",
        de: "Quadratmeter",
      },
      value: "",
      name: "sq_meter",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Number of rooms",
        "en-UK": "Number of rooms",
        es: "Número de habitaciones",
        de: "Anzahl der Zimmer",
      },
      value: "",
      name: "number_rooms",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Number of bedrooms",
        "en-UK": "Number of bedrooms",
        es: "Número de habitaciones",
        de: "Anzahl der Schlafzimmer",
      },
      value: "",
      name: "number_bedrooms",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        de: "Anzahl der Badezimmer",
        es: "Cantidad de ba\u00f1os",
        "en-US": "Number of Bathrooms",
      },
      name: "number_bathrooms",
      value: "",
      required: true,
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Living rooms",
        "en-UK": "Living rooms",
        es: "Salas de estar",
        de: "Anzahl der Wohnzimmer",
      },
      value: "",
      name: "number_living_rooms",
    },
    divider,
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Storage, mts",
        "en-UK": "Storage, mts",
        es: "Almacenamiento, mts",
        de: "Abstellraum, mts",
      },
      placeholder: "0",
      value: "",
      name: "storage_mts",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Number of floors in the building",
        "en-UK": "Number of floors in the building",
        es: "Número de pisos en el edificio",
        de: "Anzahl der Stockwerke im  Gebäude",
      },
      placeholder: "0",
      value: "",
      name: "number_floors",
      required: true,
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Floor of the property",
        "en-UK": "Floor of the property",
        es: "Piso del apartamento",
        de: "Stockwerk der Wohnung",
      },
      placeholder: "0",
      value: "",
      name: "apartment_floor",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        de: "Ausrichtung der Immobilie",
        es: "Orientacion del immueble",
        "en-US": "Orientation of the property",
      },
      name: "orientation",
      placeholder: {
        "en-US": "Select one",
        "en-UK": "Select one",
        es: "Seleccione uno",
        de: "Wählen Sie eins",
      },
      options: [
        {
          label: {
            de: "n\u00f6rdlich",
            es: "Norte",
            "en-US": "North",
          },
          value: "north",
        },
        {
          label: {
            de: "s\u00fcdlich",
            es: "Sur",
            "en-US": "South",
          },
          value: "south",
        },
        {
          label: {
            de: "\u00f6stlich",
            es: "Este",
            "en-US": "East",
          },
          value: "east",
        },
        {
          label: {
            de: "westlich",
            es: "Oeste",
            "en-US": "West",
          },
          value: "west",
        },
      ],
      value: [],
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Number of parking lots",
        "en-UK": "Number of parking lots",
        es: "Número de plazas de aparcamiento",
        de: "Anzahl der Parkplätze",
      },
      placeholder: "0",
      min: 0,
      max: 10,
      value: "",
      name: "number_parking_lots",
    },
    divider,
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Year of construction",
        "en-UK": "Year of construction",
        es: "Año de construcción",
        de: "Baujahr",
      },
      placeholder: "1950",
      value: "",
      name: "year_of_construction",
      min: 1900,
      max: new Date().getFullYear(),
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Year of renovation",
        "en-UK": "Year of renovation",
        es: "Año de renovación",
        de: "Renovierungsjahr",
      },
      placeholder: "2000",
      value: "",
      name: "year_of_renovation",
      min: 1900,
      max: new Date().getFullYear(),
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "What was renovated?",
        "en-UK": "What was renovated?",
        es: "¿Qué se renovó?",
        de: "Was wurde renoviert?",
      },
      placeholder: {
        "en-US": "Write or paste free text here",
        "en-UK": "Write or paste free text here",
        es: "Escribe o pega aqui tu explicación",
        de: "Hier freien Text schreiben oder einfügen",
      },
      value: "",
      name: "what_was_renovated",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "It's has Monument Protection",
        "en-UK": "It's has Monument Protection",
        es: "Tiene protección de monumento",
        de: "Es hat Denkmalschutz",
      },
      name: "has_monument_protection",
      checked: false,
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Has hallway",
        "en-UK": "Has hallway",
        es: "Tiene pasillo",
        de: "Hat Flur",
      },
      name: "has_hallway",
      checked: false,
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Has high ceilings",
        "en-UK": "Has high ceilings",
        es: "Tiene techos altos",
        de: "Hat hohe Decken",
      },
      name: "has_high_ceilings",
      checked: false,
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Has Elevator",
        es: "Tiene ascensor",
        de: "Hat Aufzug",
      },
      name: "has_elevator",
      checked: false,
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Has Basement",
        "en-UK": "Has Basement",
        es: "Tiene sótano",
        de: "Mit Keller",
      },
      name: "has_basement",
      checked: false,
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
            "en-US": "Island",
            es: "Isla",
            de: "Insel",
          },
          value: "Island",
        },
        {
          label: {
            "en-US": "Parallel",
            es: "Paralela",
            de: "Parallel",
          },
          value: "Parallel",
        },
        {
          label: {
            "en-US": "Straight",
            es: "Recta",
            de: "Gerade",
          },
          value: "Straight",
        },
        {
          label: {
            "en-US": "L-Shaped",
            es: "Forma de L",
            de: "L-förmig",
          },
          value: "L-Shaped",
        },
        {
          label: {
            "en-US": "U shaped",
            es: "Forma de U",
            de: "U-förmig",
          },
          value: "U shaped",
        },
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
            "en-US": "Open",
            es: "Abierta",
            de: "Öffnen",
          },
          value: "open",
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
    divider,
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
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        de: "Ausstattung",
        es: "Equipo",
        "en-US": "Equipment",
      },
      name: "equipment",
      options: [
        {
          label: {
            de: "Gehobene Qualit\u00e4t",
            es: "Alta calidad",
            "en-US": "High Quality",
          },
          value: "high_quality",
        },
        {
          label: {
            de: "Normale Qualit\u00e4t",
            es: "Calidad normal",
            "en-US": "Normal Quality",
          },
          value: "normal_quality",
        },
      ],
      value: "",
    },
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
            de: "Bodentiefe Fenster",
          },
          value: "floor_to_ceiling",
        },
        {
          label: {
            "en-US": "Single glazed windows",
            es: "De hoja simple",
            de: "Einfachverglasung",
          },
          value: "single_gazed",
        },
        {
          label: {
            "en-US": "Double glazed windows",
            es: "Doble Hoja",
            de: "Doppelverglasung",
          },
          value: "double_glazed",
        },
        {
          label: {
            "en-US": "Triple glazed windows",
            es: "Triple Hoja",
            de: "Dreifachverglasung",
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
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Type of Views",
        es: "Tipo de Vistas",
        de: "Art des Ausblicks",
      },
      value: "",
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
            de: "Innenhofblick",
          },
          value: "courtyard_view",
        },
        {
          label: {
            "en-US": "Views to the nature",
            es: "Vistas a la naturaleza",
            de: "Naturblick",
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
        de: "Qualität des Ausblicks",
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
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Has a swimming pool",
        "en-UK": "Has a swimming pool",
        es: "Tiene piscina",
        de: "Hat Schwimmbad",
      },
      name: "has_swimming_pool",
      checked: false,
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
      options: [
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
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Essential energy source",
        "en-UK": "Essential energy source",
        es: "Fuente de energía esencial",
        de: "Wesentliche Energiequelle",
      },
      name: "essential_energy_source",
      options: [
        {
          label: {
            de: "Öl",
            es: "aceite",
            "en-US": "Oil",
          },
          value: "oil",
        },
        {
          label: {
            de: "Gas",
            es: "Gas",
            "en-US": "Gas",
          },
          value: "gas",
        },
        {
          label: {
            de: "Strom",
            es: "Electricidad",
            "en-US": "Electrical power",
          },
          value: "electrical",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Final energy consumption",
        "en-UK": "Final energy consumption",
        es: "Consumo final de energía",
        de: "Endenergieverbrauch",
      },
      placeholder: "",
      value: "",
      name: "final_energy_consumption",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Year of construction according to certificate",
        "en-UK": "Year of construction according to certificate",
        es: "Año de construcción según certificado",
        de: "Baujahr laut Zertifikat",
      },
      placeholder: "1980",
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
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        "en-US": "It's ideal for",
        "en-UK": "It's ideal for",
        es: "Es ideal para",
        de: "Es ist ideal für",
      },
      placeholder: {
        "en-US": "Select one or several options",
        "en-UK": "Select one or several options",
        es: "Selecciona una o varias opciones",
        de: "Wählen Sie eine oder mehrere Optionen",
      },
      value: [],
      name: "property_is_ideal_for",
      options: [
        {
          label: {
            "en-US": "Single person",
            es: "Persona soltera",
            de: "Einzelne Person",
          },
          value: "Single person",
        },
        {
          label: {
            "en-US": "Young couple",
            es: "Pareja joven",
            de: "Junges Paar",
          },
          value: "Young couple",
        },
        {
          label: {
            "en-US": "Small Family",
            es: "Familia pequeña",
            de: "Kleine Familie",
          },
          value: "Small Family",
        },
        {
          label: {
            "en-US": "Large Family",
            es: "Familia grande",
            de: "Große Familie",
          },
          value: "Large Family",
        },
        {
          label: {
            "en-US": "Family looking to downsize",
            es: "Familia buscando reducir",
            de: "Familie möchte sich verkleinern",
          },
          value: "Family looking to downsize",
        },
        {
          label: {
            "en-US": "Family looking to upsize",
            es: "Familia buscando agrandar",
            de: "Familie möchte sich vergrößern",
          },
          value: "Family looking to upsize",
        },
        {
          label: {
            "en-US": "Investors",
            es: "Inversionistas",
            de: "Investoren",
          },
          value: "Investors",
        },
      ],
    },
    translationsFormField,
  ];
}
