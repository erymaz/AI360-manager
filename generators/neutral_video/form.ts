import { getAvatars, avatarMetaData } from "@/sdk/elai/avatars";
import { getFonts, fontMetaData } from "@/sdk/elai/fonts";
import { getMusics, musicMetaData } from "@/sdk/elai/musics";
import { FormField, FormFieldType } from "@/types";

const divider = {
  formFieldType: FormFieldType.Divider,
  name: "",
  label: "",
};

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
        "en-US": "Product Description",
        "en-UK": "Product Description",
        es: "Descripción del Producto",
        de: "Produktbeschreibung",
      },
      placeholder: {
        "en-US":
          "Discover the epitome of luxury living with this stunning 79 sq meter apartment for sale.",
        es: "Descubra el epítome de la vida de lujo con este impresionante apartamento de 79 metros cuadrados en venta.",
        "de":
          "Entdecken Sie den Inbegriff von luxuriösem Wohnen mit dieser atemberaubenden, 79 m² großen Wohnung zum Verkauf.",
      },
      value: "",
      name: "product_description",
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
    divider,
    {
      formFieldType: FormFieldType.Callout,
      label: {
        "en-US":
          "Important! For best visual experience, the uploaded image has to be in a 16:9 format",
        es: "¡Importante! Para una mejor experiencia visual, la imagen cargada debe estar en 16:9",
        "de":
          "Wichtig! Für ein optimales visuelles Erlebnis muss das hochgeladene Bild im Format 16:9 vorliegen",
      },
      // value: "For best visual experience, the uploaded image has to be in a 16:9 format",
    },
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Image 1",
        "en-UK": "Image 1",
        es: "Imagen 1",
        de: "Bild 1",
      },
      name: "image_1",
      required: true,
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": " ",
        "en-UK": " ",
        es: " ",
        de: " ",
      },
      placeholder: "",
      value: "",
      name: "image_description_1",
    },
    divider,
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Image 2",
        "en-UK": "Image 2",
        es: "Imagen 2",
        de: "Bild 2",
      },
      name: "image_2",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": " ",
        "en-UK": " ",
        es: " ",
        de: " ",
      },
      placeholder: "",
      value: "",
      name: "image_description_2",
    },
    divider,
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Image 3",
        "en-UK": "Image 3",
        es: "Imagen 3",
        de: "Bild 3",
      },
      name: "image_3",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": " ",
        "en-UK": " ",
        es: " ",
        de: " ",
      },
      placeholder: "",
      value: "",
      name: "image_description_3",
    },
    divider,
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Image 4",
        "en-UK": "Image 4",
        es: "Imagen 4",
        de: "Bild 4",
      },
      name: "image_4",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": " ",
        "en-UK": " ",
        es: " ",
        de: " ",
      },
      placeholder: "",
      value: "",
      name: "image_description_4",
    },
    divider,
    {
      formFieldType: FormFieldType.Image,
      label: {
        "en-US": "Image 5",
        "en-UK": "Image 5",
        es: "Imagen 5",
        de: "Bild 5",
      },
      name: "image_5",
      resize: { width: 1024 },
    },
    {
      formFieldType: FormFieldType.Text,
      label: {
        "en-US": " ",
        "en-UK": " ",
        es: " ",
        de: " ",
      },
      placeholder: "",
      value: "",
      name: "image_description_5",
    },
  ];
}
