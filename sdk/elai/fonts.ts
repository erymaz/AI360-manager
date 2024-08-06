interface FontData {
  name: string;
}

interface Fonts {
  [key: string]: FontData;
}

const fonts: Fonts = {
  "arial": {
    "name": "Arial",
  },
  "arial_black": {
    "name": "Arial Black",
  },
  "lato": {
    "name": "Lato",
  },
  "montserrat": {
    "name": "Montserrat",
  },
  "roboto": {
    "name": "Roboto",
  }
};

export function getFonts() {
  return Object.keys(fonts);
}

export function fontMetaData(font: string) {
  const fontData = fonts[font];

  if (!fontData) {
    const error = new Error(`font not found: ${font}`);
    throw error;
  }

  return fontData;
}
