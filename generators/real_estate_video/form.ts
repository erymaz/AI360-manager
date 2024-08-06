import { getAvatars, avatarMetaData } from "@/sdk/elai/avatars";
import { getFonts, fontMetaData } from "@/sdk/elai/fonts";
import { getMusics, musicMetaData } from "@/sdk/elai/musics";
import { FormField, FormFieldType } from "@/types";

const avatarOptions = getAvatars().map((avatar) => ({
  value: avatar,
  label: avatarMetaData(avatar)["name"],
  image: avatarMetaData(avatar)["canvas"],
}));

const fontOptions = getFonts().map((font) => ({
  value: font,
  label: fontMetaData(font)["name"],
}));

const musicOptions = getMusics().map((music) => ({
  value: music,
  label: musicMetaData(music)["musicName"],
}));

export function getFormSchema() {
  return [
    {
      formFieldType: FormFieldType.Textarea,
      label: {
        "en-US": "Property Description Text",
        "en-UK": "Property Description Text",
        es: "Texto del Exposé",
        de: "Exposé-Text",
      },
      placeholder: {
        "en-US": "Write or paste your property description text here",
        "en-UK": "Write or paste your property description here",
        es: "Escribe o pega aqui tu description del immueble aqui",
        de: "Schreiben oder fügen Sie den Text Ihrer Immobilienexposé hier ein",
      },
      value: "",
      name: "expose_text",
      maxLength: 8000,
      required: true,
    },
    {
      formFieldType: FormFieldType.Avatar,
      label: {
        "en-US": "Select Avatar",
        "en-UK": "Select Avatar",
        es: "Seleccionar Avatar",
        de: "Wähle Avatar aus",
      },
      options: avatarOptions,
      name: "select_avatar",
      value: "amanda",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Background Music",
        "en-UK": "Background Music",
        es: "Música de Fondo",
        de: "Hintergrundmusik",
      },
      options: musicOptions,
      name: "background_music",
      value: "stay_with_me",
    },
    {
      formFieldType: FormFieldType.Dropdown,
      label: {
        "en-US": "Select a font",
        "en-UK": "Select a font",
        es: "Seleccionar una fuente",
        de: "Schriftart auswählen",
      },
      options: fontOptions,
      name: "font",
      value: "arial",
    },
    {
      formFieldType: FormFieldType.Callout,
      label: {
        "en-US":
          "For best visual experience, the uploaded image has to be in a 16:9 format",
        es: "¡Importante! Para una mejor experiencia visual, la imagen cargada debe estar en 16:9",
        "de":
          "Wichtig! Für ein optimales visuelles Erlebnis muss das hochgeladene Bild im Format 16:9 vorliegen",
      },
      // value: "For best visual experience, the uploaded image has to be in a 16:9 format",
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Title Page Image",
        "en-UK": "Title Page Image",
        es: "Imagen de la Página del Título",
        de: "Titelseite Bild",
      },
      required: true,
      name: "title_page_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Floor Plans Image",
        "en-UK": "Floor Plans Image",
        es: "Imagen de Planos del Piso",
        de: "Grundriss Bild",
      },
      name: "floor_plan_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Living room Image",
        "en-UK": "Living room Image",
        es: "Imagen del Sala de Estar",
        de: "Wohnzimmerbild",
      },
      name: "living_room_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Kitchen Image",
        "en-UK": "Kitchen Image",
        es: "Imagen de la Cocina",
        de: "Küchenbild",
      },
      name: "kitchen_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Bathroom Image",
        "en-UK": "Bathroom Image",
        es: "Imagen del Baño",
        de: "Badezimmer Bild",
      },
      name: "bathroom_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Bedroom Image",
        "en-UK": "Bedroom Image",
        es: "Imagen del Dormitorio",
        de: "Schlafzimmer Bild",
      },
      name: "bedroom_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Terrace/Balcony Image",
        "en-UK": "Terrace/Balcony Image",
        es: "Imagen de Terraza/Balcón",
        de: "Bild von Terrasse/Balkon",
      },
      name: "terrace_balcony_image",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Property View Image",
        "en-UK": "Property View Image",
        es: "Imagen de Vista de la Propiedad",
        de: "Eigenschaften-Ansicht Bild",
      },
      name: "property_view_image",
      resize: { width: 1024 },
    },
  ];
}
