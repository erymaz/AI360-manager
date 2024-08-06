import {
  payload,
  slideObject,
  avatarObject,
  imageObject,
  textObject,
  textBgObject,
} from "./elai-video-objects";
import { avatarMetaData } from "./avatars";
import { musicMetaData } from "./musics";
import { fontMetaData } from "./fonts";
import { languageMap } from "@/sdk/localization";

export function addLineBreaks(inputString: string, maxLineLength: number) {
  const words = inputString.split(" ");
  let currentLine = "";
  let result = "";
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const potentialLine = currentLine ? currentLine + " " + word : word;

    if (potentialLine.length > maxLineLength) {
      if (lineCount > 0) {
        result += "\n";
      }
      result += currentLine;
      currentLine = word;
      lineCount++;
    } else {
      currentLine = potentialLine;
    }
  }

  // Add the last line if it's not empty
  if (currentLine) {
    if (lineCount > 0) {
      result += "\n";
    }
    result += currentLine;
    lineCount++;
  }

  return { formattedText: result, numberOfLines: lineCount };
}

export async function buildElaiRequestBody(slideData: Record<string, any>[], formData: Record<string, any>, locale: string) {

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
    const keyName = Object.keys(slideData[i]).find(key => key.startsWith("image_description_"));
    if (keyName) {
      const imageString = "image_" + keyName.slice(18);
      if (!(keyName in formData) || formData[keyName].trim() === '' || formData[imageString].trim() === '') {
        continue;
      }

      const _imageObject = JSON.parse(JSON.stringify(imageObject));
      _imageObject.src = formData[imageString];

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

    // Add text & text background image
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

    // Add avatar object
    avatarObject.src = _slideObject.avatar.canvas;
    _slideObject.canvas.objects.push(avatarObject);

    _payload.slides.push(_slideObject);
  }

  console.log("Elai API request body:");
  console.dir(_payload, { depth: null });

  return _payload;
}

export async function generateVideo(requestBody: Record<string, any>) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.ELAI_API_KEY}`
    },
    body: JSON.stringify(requestBody)
  };
  
  try {
    const response = await fetch('https://apis.elai.io/api/v1/videos', options);
    const jsonResponse = await response.json();
    console.log("Elai API response:")
    console.dir(jsonResponse, { depth: null });
    return jsonResponse._id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function validateSlide(slideObject: Record<string, any>) {

  if (slideObject.text.trim() == '' || slideObject.text.trim().length > 150) {
    return false;
  }

  if (slideObject.speech.trim() == '' || slideObject.speech.trim().length > 300) {
    return false;
  }

  return true;
}
