import { FormField, FormFieldType } from "@/types";
import { translationsFormField } from "@/sdk/localization";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Bike Brand",
        "en-UK": "Bike Brand",
        es: "Marca de bicicleta",
        de: "Fahrradmarke",
      },
      placeholder: "Trek",
      name: "bike_brand",
      value: "",
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": "Bike Model",
        "en-UK": "Bike Model",
        es: "modelo de bicicleta",
        de: "Fahrradmodell",
      },
      placeholder: "Co-op Cycles DRT 1.1",
      name: "bike_model",
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Color",
        "en-UK": "Color",
        es: "Color",
        de: "Farbe",
      },
      name: "color",
      options: [
        {
          label: {
            "en-US": "Black",
            es: "Negro",
            de: "Schwarz",
          },
          value: "black",
        },
        {
          label: {
            "en-US": "Blue",
            es: "Azul",
            de: "Blau",
          },
          value: "blue",
        },
        {
          label: {
            "en-US": "Red",
            es: "Rojo",
            de: "Rot",
          },
          value: "red",
        },
        {
          label: {
            "en-US": "Green",
            es: "Verde",
            de: "Grün",
          },
          value: "green",
        },
        {
          label: {
            "en-US": "Yellow",
            es: "Amarillo",
            de: "Gelb",
          },
          value: "yellow",
        },
        {
          label: {
            "en-US": "Silver",
            es: "Plata",
            de: "Silber",
          },
          value: "silver",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Frame Material",
        "en-UK": "Frame Material",
        es: "Material del marco",
        de: "Rahmen Material",
      },
      name: "frame_material",
      options: [
        {
          label: {
            "en-US": "Aluminum",
            es: "Aluminio",
            de: "Aluminium",
          },
          value: "aluminum",
        },
        {
          label: {
            "en-US": "Carbon",
            es: "Carbono",
            de: "Kohlenstoff",
          },
          value: "carbon",
        },
        {
          label: {
            "en-US": "Steel",
            es: "Acero",
            de: "Stahl",
          },
          value: "steel",
        },
        {
          label: {
            "en-US": "Titanium",
            es: "Titanio",
            de: "Titan",
          },
          value: "titanium",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Bike Size",
        "en-UK": "Bike Size",
        es: "Tamaño de la bicicleta",
        de: "Fahrradgröße",
      },
      name: "bike_size",
      options: [
        {
          label: "XS",
          value: "xs",
        },
        {
          label: "S",
          value: "s",
        },
        {
          label: "M",
          value: "m",
        },
        {
          label: "L",
          value: "l",
        },
        {
          label: "XL",
          value: "xl",
        },
        {
          label: "XXL",
          value: "xxl",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Wheel Size (inches)",
        "en-UK": "Wheel Size (inches)",
        es: "Tamaño de la rueda (inches)",
        de: "Radgröße (inches)",
      },
      placeholder: "27.5",
      name: "wheel_size",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Bike Weight (lbs)",
        "en-UK": "Bike Weight (lbs)",
        es: "Peso de la bicicleta (lbs)",
        de: "Fahrradgewicht (lbs)",
      },
      placeholder: "31",
      name: "bike_weight",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Weight Limit (lbs)",
        "en-UK": "Weight Limit (lbs)",
        es: "Límite de peso (lbs)",
        de: "Gewichtsgrenze (lbs)",
      },
      placeholder: "300",
      name: "weight_limit",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Fork Travel (mm)",
        "en-UK": "Fork Travel (mm)",
        es: "Tenedor de viaje (mm)",
        de: "Gabelweg (mm)",
      },
      placeholder: "100",
      name: "fork_travel",
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Rear Suspension Travel (mm)",
        "en-UK": "Rear Suspension Travel (mm)",
        es: "Recorrido de la suspensión trasera (mm)",
        de: "Federweg hinten (mm)",
      },
      placeholder: "140",
      name: "rear_suspension_travel",
      value: "",
    },
    {
      formFieldType: FormFieldType.NumberDropdown,
      label: {
        "en-US": "Number of Gears",
        "en-UK": "Number of Gears",
        es: "Número de engranajes",
        de: "Anzahl der Gänge",
      },
      placeholder: "6",
      name: "number_of_gears",
      min: 1,
      max: 27,
      value: "",
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Bike Features",
        "en-UK": "Bike Features",
        es: "Características de la bicicleta",
        de: "Fahrradfunktionen",
      },
      placeholder: "",
      name: "bike_features",
      value: "",
    },
    {
      formFieldType: FormFieldType.Checkbox,
      label: {
        "en-US": "Hydraulic Disc Brakes",
        "en-UK": "Hydraulic Disc Brakes",
        es: "Frenos de disco hidráulicos",
        de: "Hydraulische Scheibenbremsen",
      },
      name: "hydraulic_disc_brakes",
      checked: true,
      value: "",
    },
    {
      formFieldType: FormFieldType.Switch,
      label: {
        "en-US": "Drivetrain",
        "en-UK": "Drivetrain",
        es: "Transmisión",
        de: "Antriebsstrang",
      },
      name: "drivetrain",
      options: [
        {
          label: {
            "en-US": "Mechanical",
            es: "Mecánico",
            de: "Mechanisch",
          },
          value: "mechanical",
        },
        {
          label: {
            "en-US": "Electronic",
            es: "Electrónico",
            de: "Elektronisch",
          },
          value: "electronic",
        },
      ],
      value: "",
    },
    {
      formFieldType: FormFieldType.Number,
      label: {
        "en-US": "Bike Price ($)",
        "en-UK": "Bike Price (£)",
        es: "Precio de la bicicleta (€)",
        de: "Fahrradpreis (€)",
      },
      placeholder: "100",
      name: "bike_price",
      value: "",
    },
    {
      formFieldType: FormFieldType.Multiselect,
      label: {
        "en-US": "Suitable for",
        "en-UK": "Suitable for",
        es: "Adecuado para",
        de: "Passend für",
      },
      name: "suitable_for",
      options: [
        {
          label: "Trail",
          value: "Trail",
        },
        {
          label: "Enduro",
          value: "Enduro",
        },
        {
          label: "Cross Country",
          value: "Cross_Country",
        },
        {
          label: "Downhill",
          value: "Downhill",
        },
        {
          label: "All Mountain",
          value: "All_Mountain",
        },
      ],
      value: [],
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Additional information",
        "en-UK": "Additional information",
        es: "Información complementaria",
        de: "Weitere Informationen",
      },
      placeholder: "",
      name: "additional_info",
      value: "",
    },
    {
      formFieldType: FormFieldType.Date,
      label: {
        "en-US": "Manufacture date",
        es: "",
        de: "",
      },
      name: "manufacture_date",
    },
    translationsFormField
  ];
}
