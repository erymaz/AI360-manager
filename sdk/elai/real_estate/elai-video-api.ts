import {
  payload,
  slideObject,
  avatarObject,
  imageObject,
  textObject,
  textBgObject,
} from "@/sdk/elai/elai-video-objects";
import {
  energyEfficiencyTextObject,
  energyEfficiencyBgImageObject,
  energyEfficiencyAImageObject,
  energyEfficiencyBImageObject,
  energyEfficiencyCImageObject,
  energyEfficiencyDImageObject,
  energyEfficiencyEImageObject,
  energyEfficiencyFImageObject,
  energyEfficiencyGImageObject,
  energyEfficiencyHImageObject,
  ctaImageObject,
} from "./elai-video-objects";
import { avatarMetaData } from "@/sdk/elai/avatars";
import { musicMetaData } from "@/sdk/elai/musics";
import { fontMetaData } from "@/sdk/elai/fonts";
import { addLineBreaks, validateSlide } from "@/sdk/elai/elai-video-api";
import { languageMap } from "@/sdk/localization";

const energyEfficiencyClassImages: { [key: string]: object } = {
  "a": energyEfficiencyAImageObject,
  "b": energyEfficiencyBImageObject,
  "c": energyEfficiencyCImageObject,
  "d": energyEfficiencyDImageObject,
  "e": energyEfficiencyEImageObject,
  "f": energyEfficiencyFImageObject,
  "g": energyEfficiencyGImageObject,
  "h": energyEfficiencyHImageObject
};

export async function buildElaiRequestBody(slideData: Record<string, any>[], formData: Record<string, any>, locale: string, rating: string) {

  const _payload = JSON.parse(JSON.stringify(payload));

  // Configure selected background music
  const selectedMusic = formData.background_music;
  const musicData = musicMetaData(selectedMusic);
  if (musicData) {
    _payload.data.musicName = musicData.musicName
    _payload.data.musicUrl = musicData.musicUrl
  }

  // For each slideData element
  // Compose a slide page, fill in text speech and image link
  for (let i = 0; i < slideData.length; i++) {

    // Skip invalid slides
    if (!validateSlide(slideData[i])) {
      continue;
    }

    // Set a hard limit on number of slides
    if (i > 20) {
      console.log("Maximum slide limit reached. Slides after 20 have been truncated.")
      break;
    }

    // Add a slide
    const _slideObject = JSON.parse(JSON.stringify(slideObject));
    _slideObject.id = i + 1;

    // Add avatar id & canvas
    const selectedAvatar = formData.select_avatar;
    const avatarData = avatarMetaData(selectedAvatar);
    if (avatarData) {
      _slideObject.avatar.id = avatarData.id;
      _slideObject.avatar.gender = avatarData.gender;
      _slideObject.avatar.canvas = avatarData.canvas;
      _slideObject.language = languageMap[locale] || "English";
      _slideObject.voice = avatarData.voice[locale] || avatarData.voice["en"];
    }

    // Add speech
    _slideObject.speech = slideData[i].speech;

    // Add background image for this page
    // Background image must be submitted and non-empty for this slide to be added
    if (slideData[i].image in formData) {
      if (formData[slideData[i].image].trim() === '') {
        continue;
      }
      const _imageObject = JSON.parse(JSON.stringify(imageObject));
      _imageObject.src = formData[slideData[i].image];

      // Extract width and height from the image src
      const regex = /_w(\d+)_h(\d+)/;
      const match = _imageObject.src.match(regex);

      if (match) {
        _imageObject.width = parseInt(match[1], 10);
        _imageObject.height = parseInt(match[2], 10);

        _imageObject.scaleX = 650/_imageObject.width;
        _imageObject.scaleY = 366/_imageObject.height;
      }

      _slideObject.canvas.objects.push(_imageObject);
    }

    // Special page: CTA
    else if (slideData[i].image === "conclusion_call_for_action_image") {
      _slideObject.canvas.objects.push(ctaImageObject);        
    }

    // Special page: energy efficiency class
    else if (slideData[i].image === "energy_efficiency_class_image") {

      // Skip the energy efficiency slide if class is not successfully extracted
      if (!rating || !(rating.toLowerCase() in energyEfficiencyClassImages)) {
        continue;
      }
    
      const energyEfficiencyImageObjectToUse = energyEfficiencyClassImages[rating.toLowerCase()];
    
      _slideObject.canvas.objects.push(energyEfficiencyBgImageObject);
      _slideObject.canvas.objects.push(energyEfficiencyImageObjectToUse);
      
      const energyEfficiencyTextObjectCopy = { ...energyEfficiencyTextObject, text: `Energy efficiency class ${rating.toUpperCase()}` };
      _slideObject.canvas.objects.push(energyEfficiencyTextObjectCopy);
    }

    else {
      continue;
    }

    // Add text & text background image
    if (slideData[i].image !== "energy_efficiency_class_image") {
      const _textObject = JSON.parse(JSON.stringify(textObject));
      const { formattedText, numberOfLines } = addLineBreaks(slideData[i].text, 46);
      _textObject.text = formattedText
      const selectedFont = formData.font;
      const fontData = fontMetaData(selectedFont);
      if (fontData) {
        _textObject.fontFamily = fontData.name;
      }
      const _textBgObject = JSON.parse(JSON.stringify(textBgObject));
      _textBgObject.height = 25 + numberOfLines * 35;
      _slideObject.canvas.objects.push(_textBgObject);
      _slideObject.canvas.objects.push(_textObject);
    }

    // Add avatar object
    avatarObject.src = _slideObject.avatar.canvas;
    _slideObject.canvas.objects.push(avatarObject);

    _payload.slides.push(_slideObject);
  }

  console.log("Elai API request body:");
  console.dir(_payload, { depth: null });

  return _payload;
}
