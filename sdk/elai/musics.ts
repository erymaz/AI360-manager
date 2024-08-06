interface MusicData {
  tags: string[];
  category: string;
  musicName: Record<string, string>;
  musicUrl: string;
}

type Musics = {
  [key: string]: MusicData;
}

const musics: Musics = {
  "stay_with_me": {
    "tags": ["inspirational", "smooth", "happy"],
    "category": "corporate",
    "musicName": {
      "en-US": "Stay With Me",
      es: "Quédate Conmigo",
      de: "Bleib bei Mir",
    },
    "musicUrl": "https://elai-media.s3.eu-west-2.amazonaws.com/music/mixkit-stay-with-me-838.mp3",
  },
  "fun_times": {
    "tags": ["positive", "cheerful", "motivational" ],
    "category": "corporate",
    "musicName": {
      "en-US": "Fun Times",
      es: "Momentos Divertidos",
      de: "Spaßige Zeiten",
    },
    "musicUrl": "https://elai-media.s3.eu-west-2.amazonaws.com/music/mixkit-fun-times-7.mp3"
  },
  "our_journey": {
    "tags": ["dramatic", "inspirational", "uplifting"],
    "category": "corporate",
    "musicName": {
      "en-US": "Our Journey",
      es: "Nuestro Viaje",
      de: "Unsere Reise",
    },
    "musicUrl": "https://elai-media.s3.eu-west-2.amazonaws.com/music/mixkit-our-journey-1073.mp3"
  },
  "life_is_a_dream": {
    "tags": ["uplifting", "happy", "motivational"],
    "category": "corporate",
    "musicName": {
      "en-US": "Life is a Dream",
      es: "La Vida es un Sueño",
      de: "Das Leben ist ein Traum",
    },
    "musicUrl": "https://elai-media.s3.eu-west-2.amazonaws.com/music/mixkit-life-is-a-dream-837.mp3"
  }
};

export function getMusics() {
  return Object.keys(musics);
}

export function musicMetaData(music: string) {
  const musicData = musics[music];

  if (!musicData) {
    const error = new Error(`music not found: ${music}`);
    throw error;
  }

  return musicData;
}
