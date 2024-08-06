import { translationsFormField } from "@/sdk/localization";
import { FormField, FormFieldType } from "@/types";

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Type",
        es: "Tipo",
        de: "Typ",
      },
      value: "",
      name: "type",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Tudor style bungalow",
        es: "Bungalow estilo Tudor",
        de: "Bungalow im Tudor-Stil",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Price",
        es: "Precio",
        de: "Preis",
      },
      value: "",
      name: "price",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "850,000 GBP",
        es: "850.000 libras esterlinas",
        de: "850.000 GBP",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Location",
        es: "Ubicaci\u00f3n",
        de: "Standort",
      },
      value: "",
      name: "location",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "Tobermory Scotland",
        es: "Tobermory Escocia",
        de: "Tobermory Schottland",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Floor Area",
        es: "Superficie del piso",
        de: "Grundfl\u00e4che",
      },
      value: "",
      name: "floor_area",
      maxLength: 100,
      required: true,
      placeholder: {
        "en-US": "3000 sq. foot",
        es: "3000 pies cuadrados",
        de: "3000 Quadratfu\u00df",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Bedroom",
        es: "Dormitorio",
        de: "Schlafzimmer",
      },
      value: "",
      name: "bedroom",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "3 bedrooms with fireplaces, attached bathrooms, master bedroom has fresco style paintings and a walk-in closet with wood detailing",
        es: "3 habitaciones con chimenea, ba\u00f1os adjuntos, la habitaci\u00f3n principal tiene pinturas estilo fresco y un vestidor con detalles de madera.",
        "de":
          "3 Schlafzimmer mit Kaminen, angeschlossenen Badezimmern, Hauptschlafzimmer mit Gem\u00e4lden im Freskostil und einem begehbaren Kleiderschrank mit Holzdetails",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Kitchen",
        es: "Cocina",
        de: "K\u00fcche",
      },
      value: "",
      name: "kitchen",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US": "marble countertop, latest electric chimney",
        es: "encimera de m\u00e1rmol, chimenea el\u00e9ctrica de \u00faltima generaci\u00f3n",
        de: "Marmorarbeitsplatte, modernster elektrischer Kamin",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Bathroom",
        es: "Ba\u00f1o",
        de: "Badezimmer",
      },
      value: "",
      name: "bathroom",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US": "luxury fittings:bathtubs, showers, basins",
        es: "accesorios de lujo:ba\u00f1eras, duchas, lavabos",
        de: "Luxusausstattung: Badewannen, Duschen, Waschbecken",
      },
    },
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Additional Features",
        es: "Caracter\u00edsticas adicionales",
        de: "Zusatzfunktionen",
      },
      value: "",
      name: "additional_features",
      maxLength: 600,
      required: true,
      placeholder: {
        "en-US":
          "dining hall has 10 seater table and oil paintings, walled lawn in the back, landscaped, flowers and vegetable garden, Scottish highlands.",
        es: "el comedor tiene una mesa para 10 comensales y pinturas al \u00f3leo, c\u00e9sped amurallado en la parte de atr\u00e1s, jardines, flores y huerta, Highlands escocesas.",
        "de":
          "Der Speisesaal verf\u00fcgt \u00fcber einen 10-Sitzer-Tisch und \u00d6lgem\u00e4lde, einen ummauerten Rasen auf der R\u00fcckseite, einen Landschafts-, Blumen- und Gem\u00fcsegarten im schottischen Hochland.",
      },
    },
    translationsFormField,
  ];
}
