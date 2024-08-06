type AvatarData = {
  id: string;
  name: string;
  gender: string;
  canvas: string;
  voice: Record<string, string>;
};

const avatars: { [key: string]: AvatarData; } = {
  "amanda": {
    "id": "amanda.business",
    "name": "Amanda",
    "gender": "female",
    "canvas": "https://elai-avatars.s3.us-east-2.amazonaws.com/common/amanda/amanda_business_low.png",
    "voice": {
      "en": "en-US-AriaNeural",
      "es": "es-ES-ElviraNeural",
      "de": "de-DE-TanjaNeural",
    }
  },
  "cody": {
    "id": "cody.business",
    "name": "Cody",
    "gender": "male",
    "canvas": "https://elai-avatars.s3.us-east-2.amazonaws.com/common/cody/business/cody_business.png",
    "voice": {
      "en": "en-US-GuyNeural",
      "es": "es-ES-AlvaroNeural",
      "de": "de-DE-RalfNeural",
    }
  },
  "max": {
    "id": "max.business",
    "name": "Max",
    "gender": "male",
    "canvas": "https://elai-avatars.s3.us-east-2.amazonaws.com/common/max/max_business.png",
    "voice": {
      "en": "en-US-GuyNeural",
      "es": "es-ES-AlvaroNeural",
      "de": "de-DE-RalfNeural",
    }
  },
  "olivia": {
    "id": "olivia.business",
    "name": "Olivia",
    "gender": "female",
    "canvas": "https://elai-avatars.s3.us-east-2.amazonaws.com/common/olivia/business/olivia_business.png",
    "voice": {
      "en": "en-US-AriaNeural",
      "es": "es-ES-ElviraNeural",
      "de": "de-DE-TanjaNeural",
    }
  }
};

export function getAvatars() {
  return Object.keys(avatars);
}

export function avatarMetaData(avatar: string) {
  const avatarData = avatars[avatar];

  if (!avatarData) {
    const error = new Error(`Avatar not found: ${avatar}`);
    throw error;
  }

  return avatarData;
}
