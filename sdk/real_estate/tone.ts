const realEstateTone: { [key: string]: { [key: string]: string[] } } = {
  solid_properties: {
    de: [
      "Solide 2-Zimmer Wohnung in ruhiger Lage",
      "Solide Etagenwohnung im Grünen! ",
      "Solide und schön! 2- Zimmer-Wohnung in Berlin",
      "2-Zimmer-Wohnung mit solider Ausstattung zu vermieten",
      "Solides Wohnen! 2-Zimmer Wohnung in Berlin zu vermieten",
    ],
    "en-US": [
      "Solid 2-room-apartment in a quiet location",
      "Solid upper floor apartment in the countryside",
      "Solid and beautiful! 2-room-apartment in Berlin",
      "2-room apartment with solid furnishings for rent",
      "Solid living! 2-room apartment for rent in Berlin",
    ],
  },
  good_properties: {
    de: [
      "Gepflegte 2-Zimmer Wohnung im 2. Obergeschoss",
      "Großzügige 2-Zimmer-Wohnung mit Gäste-WC und Balkon",
      "Attraktives Wohnen für die ganze Familie - schöne 2-Zimmer-Wohnung in Berlin",
      "Elegante Etagenwohnung in zentraler Lage von Berlin!",
      "Charmante Maisonette-Wohnung in Berlin",
      "Stilvolle 2-Zimmer-Wohnung mit Terrasse und Garten in Berlin",
      "Stilvoll, vollmöblierte 2-Zimmer-Wohnung in Berlin",
      "Schöne 2-Zimmer-Wohnung in Berlin",
    ],
    "en-US": [
      "Well-maintained 2-room apartment on the 2th floor",
      "Spacious 2-room apartment with guest toilet and balcony",
      "Attractive living for the whole family - beautiful 2-room apartment in Berlin",
      "Elegant upper floor apartment in a central location of Berlin!",
      "Charming maisonette apartment in Berlin",
      "Stylish 2-room apartment with terrace and garden in Berlin",
      "Stylish, full furnished 2-room apartment in Berlin",
      "Beautiful 2-room apartment in Berlin",
    ],
  },
  demanding_quality_properties: {
    de: [
      "Exklusives Wohnen - hier werden Wohnträume wahr",
      "Exklusive 2-Zimmer-Wohnung in Berlin",
      "Exklusive 2-Zimmer- Maisonette Wohnung mit Balkon und Einbauküche",
      "Traumhafte 2-Zimmer-Wohnung in bester Lage",
      "Großzügige 2-Zimmer-Wohnung mit eigenem Garten für anspruchsvolle Mieter!",
      "Für anspruchsvolle Mieter - 2-Zimmer-Wohnung mit toller Ausstattung in Berlin",
    ],
    "en-US": [
      "Exclusive living - where living dreams come true",
      "Exclusive 2-room apartment in Berlin",
      "Exclusive 2-room maisonette apartment with balcony and fitted kitchen",
      "Dreamlike 2-room apartment in the best location",
      "Spacious 2-room apartment with its own garden for demanding tenants!",
      "For demanding tenants - 2-room apartment with great features in Berlin",
    ],
  },
  high_class_properties: {
    de: [
      "Wohnkomfort für höchste Ansprüche - 2-Zimmer-Wohnung in Berlin",
      "2-Zimmer-Wohnung mit luxuriöser Ausstattung in Berlin",
      "Hier werden Luxusträume wahr - 2-Zimmer-Wohnung in Berlin",
      "Unfassbar schön - traumhafte 2-Zimmer-Wohnung im Herzen von Berlin",
      "Luxuriöse 2-Zimmer Wohnung in Berlin zu vermieten!",
    ],
    "en-US": [
      "Living comfort for the highest demands - 2-room apartment in Berlin",
      "2-room apartment with luxurious furnishings in Berlin",
      "Luxury dreams come true here - 2-room apartment in Berlin",
      "Incredibly beautiful - dreamlike 2-room apartment in the heart of Berlin",
      "Luxurious 2-room apartment for rent in Berlin!",
    ],
  },
  renovated_properties: {
    de: [
      "Sanierte 2-Zimmer-Wohnung im Herzen von Berlin",
      "Wie neu - Erstbezug nach Sanierung",
      "Schöne neuwertige 2-Zimmer Wohnung nach Sanierung",
      "Vollständig renovierte 2-Zimmer-Wohnung im Zentrum von Berlin",
      "Renovierter Altbau: gemütliche 2-Zimmer-Wohnung",
      "Renovierte Altbauwohnung sucht neue Mieter!",
      "Erstbezug nach Sanierung - 2-Zimmer-Wohnung in Berlin",
    ],
    "en-US": [
      "Refurbished 2-room apartment in the heart of Berlin",
      "Like new - first occupancy after renovation",
      "Beautiful as good as new 2-room apartment after renovation",
      "Completely renovated 2-room apartment in the center of Berlin",
      "Renovated old building: cozy 2-room apartment",
      "Renovated old-building-apartment looking for new tenants! ",
      "First occupancy after renovation - 2-room apartment in Berlin",
    ],
  },
  modernized_properties: {
    de: [
      "Smarter Wohnen! Modernisierte 2-Zimmer-Wohnung in Berlin",
      "Modernisierte 2-Zimmer-Wohnung mit toller Ausstattung!",
      "Moderner Wohnen! 2 - Zimmer Wohnung im Herzen von Berlin",
      "Moderne 2-Zimmer-Wohnung in gehobener Lage",
      "Moderne Wohnung für moderne Mieter! 2-Zimmer-Wohnung in Berlin",
    ],
    "en-US": [
      "Smarter living! Modernized 2-room apartment in Berlin",
      "Modernized 2-room apartment with great features! ",
      "Modern living! 2-room apartment in the heart of Berlin",
      "Modern 2-room apartment in an upscale location",
      "Modern apartment for modern tenants! 2-room apartment in Berlin",
    ],
  },
  new_build_properties: {
    de: [
      "Einziehen & Wohlfühlen - 2-Zimmer- Neubauwohnung im Erdgeschoss/ 2. Obergeschoss",
      "Neubau! Moderne 2-Zimmer-Wohnung mit Einbauküche und Sonnenterrasse",
      "Alles Neu! 2-Zimmer-Wohnung zum Wohlfühlen in Berlin",
      "Schöne zentrale Neubauwohnung mit Balkon - Südlage",
      "Wie für Sie gemacht - Neubauwohnung mit 2 Zimmer in Berlin",
    ],
    "en-US": [
      "Move in & feel good - 2-room new building apartment on the ground floor / 2th floor",
      "New building! Modern 2-room apartment with fitted kitchen and sun terrace",
      "All new! 2-room apartment to feel good in Berlin",
      "Beautiful central new building apartment with balcony - south facing",
      "Made for you - new building apartment with 2 rooms in Berlin",
    ],
  },
  attic_properties: {
    de: [
      "Junges Wohnen! Praktische 2-Zimmer- Wohnung mit Dachterrasse",
      "Exklusive Penthousewohnung mit tollem Ausblick auf Berlin",
      "Schöne 2-Zimmer-Dachgeschosswohnung in Berlin",
      "2-Zimmer-Dachgeschosswohnung mit Aufzug in guter Lage von Berlin",
      "2-Zimmer-Dachgeschosswohnung in Uni-Nähe!",
      "Praktische 2-Zimmer-Dachgeschosswohnung zu vermieten!",
    ],
    "en-US": [
      "Young living! Practical 2-room apartment with roof terrace",
      "Exclusive penthouse apartment with great views of Berlin",
      "Beautiful 2-room attic apartment in Berlin",
      "2-room attic apartment with elevator in a good location in Berlin",
      "2-room attic apartment near the university! ",
      "Practical 2-room attic apartment for rent!",
    ],
  },
  special_features_properties: {
    de: [
      "Altersgerechtes Wohnen - barrierefreie 2-Zimmer-Wohnung",
      "Hier können Sie alt werden: Seniorengerechte 2-Zimmer Wohnung in Berlin",
      "Barrierefreie Erdgeschosswohnung/ Obergeschosswohnung in gehobener Lage",
      "Barrierefreies und seniorengerechtes Wohnen - Sorglos Wohnen in der Seniorenresidenz",
      "2-Zimmer-Wohnung mit rustikalem Flair in Berlin",
      "Schöne Altbauwohnung mit historischem Flair in Berlin",
      "Besonderer Charme! 2-Zimmer-Altbauwohnung in Berlin",
      "Traum von Altbau: 2-Zimmer-Wohnung in Berlin",
      "Lichtdurchflutete 2-Zimmer-Wohnung in schöner Lage!",
      "Souterrainwohnung im Herzen von Berlin",
      "Schöne 2-Zimmer-Einliegerwohnung in Berlin zu vermieten! ",
      "Nachhaltig und lebenswert! Gemütliche barrierearme 2-Zimmer Wohnung in Berlin",
      "Energieeffizientes Wohnen - KFWX Haus in Berlin zur Miete!",
    ],
    "en-US": [
      "Age-appropriate living - barrier-free 2-room apartment",
      "Here you can grow old: senior-friendly 2-room apartment in Berlin",
      "Barrier-free ground floor / upper floor apartment in an upscale location",
      "Barrier-free and senior-friendly living - carefree living in the senior residence",
      "2-room apartment with rustic flair in Berlin",
      "Beautiful old building apartment with historical flair in Berlin",
      "Special charm! 2-room old building apartment in Berlin",
      "Dream of old building: 2-room apartment in Berlin",
      "Light-flooded 2-room apartment in a beautiful location! ",
      "Basement apartment in the heart of Berlin",
      "Beautiful 2-room granny flat for rent in Berlin! ",
      "Sustainable and livable! Cozy low-barrier 2-room apartment in Berlin",
      "Energy-efficient living - KFW-2 house for rent in Berlin!",
    ],
  },
  houses_for_rent: {
    de: [
      "Top-Angebot: Wohnen wie im eigenen Haus! 2-Zimmer-Haus mit Garten",
      "Haus zur Miete! 2-Zimmer in Berlin für die ganze Familie!",
      "Platzwunder! 2-Zimmer-Doppelhaus zur Miete! ",
      "Platzwunder! 2-Zimmer-Miethaus!",
      "Traumhaus mit 2 Zimmern zu vermieten - hier können Sie leben",
      "Miethaus in Berlin zu vermieten - 2 Zimmer",
    ],
    "en-US": [
      "Top offer: Living like in your own house! 2-room house with garden House for rent! ",
      "2 rooms in Berlin for the whole family! ",
      "Space miracle! 2-room semi-detached house for rent! ",
      "Space miracle! 2-room rental house! ",
      "Dream house with 2 rooms for rent - here you can live",
      "Rental house in Berlin for rent - 2 rooms",
    ],
  },
  special_areas_properties: {
    de: [
      "Naturnahes Wohnen: Schöne 2-Zimmer Wohnung mit Blick ins Grüne",
      "2-Zimmer-Wohnung in Idyllischer Umgebung",
      "Ruhegenießer aufgepasst: Tolle 2-Zimmer-Wohnung in ruhiger Lage",
      "Berlin: 2-Zimmer-Wohnung in direkter Uni-Nähe!",
      "Schönes Studenten-Studio in direkter Unilage! ",
      "Wohnen im Stadtpark: Naturliebhaber aufgepasst. 2-Zimmer-Wohnung in Berlin",
    ],
    "en-US": [
      "Close to nature living: Beautiful 2-room apartment with a view of the greenery",
      "2-room apartment in idyllic surroundings",
      "Attention peace lovers: Great 2-room apartment in a quiet location",
      "Berlin: 2-room apartment in direct proximity to the university! ",
      "Beautiful student studio in direct university location! ",
      "Living in the city park: Attention nature lovers. 2-room apartment in Berlin",
    ],
  },
  one_room_apartment: {
    de: [
      "Praktisches Apartment in Zentrumsnähe",
      "Möblierte 1-Zimmer-Wohnung mit praktischer Ausstattung",
      "Attraktive Single-Wohnung mit Einbauküche in Berlin",
      "Klein aber fein - schöne 1-Zimmer-Wohnung in Berlin mit Balkon",
      "Studio in Berlin zu vermieten",
      "Klein und schön - !-Zimmer-Wohnung in Berlin zu vermieten",
      "Klein aber oho - schönes Studio in Berlin zu vermieten",
    ],
    "en-US": [
      "Practical apartment near the center",
      "Furnished 1-room apartment with practical equipment",
      "Attractive single apartment with fitted kitchen in Berlin",
      "Small but nice - beautiful 1-room apartment in Berlin with balcony",
      "Studio for rent in Berlin",
      "Small and beautiful - 1-room apartment for rent in Berlin",
      "Small but mighty - beautiful studio for rent in Berlin",
    ],
  },
  renovation_needed_properties: {
    de: [
      "2-Zimmer-Wohnung sucht renovierungsfreudige Handwerker!",
      "Renovierungsbedürftige 2-Zimmer Wohnung in Berlin",
      "Für Kreative! Lassen Sie hier Ihre Wohnträume wahr werden. Renovierungsbedürftige 2-Zimmer-Wohnung",
      "Für kreative Mieter - renovierungsbedürftige 2-Zimmer-Wohnung in Berlin",
      "Lassen Sie hier Ihrer Kreativität freien Lauf! Renovierungsbedürftige 2-Zimmer-Wohnung in Berlin",
    ],
    "en-US": [
      "2-room apartment looking for renovation-loving craftsmen! ",
      "Renovation-needy 2-room apartment in Berlin",
      "For creatives! Make your living dreams come true here. Renovation-needy 2-room apartment",
      "For creative tenants - renovation-needy 2-room apartment in Berlin",
      "Let your creativity run wild here! Renovation-needy 2-room apartment in Berlin",
    ],
  },
};

export function getTonePrompt(
  tone: string,
  locale: string,
  formSchema: Record<string, any>[],
) {
  let prompt = "";
  if (tone) {
    const schemaMap = new Map(formSchema.map((item) => [item.name, item]));
    const schemaItem = schemaMap.get("tone")!;
    const toneOption = schemaItem.options.find(
      (option: { value: string; label: Record<string, string> }) =>
        option.value === tone,
    );
    const label = toneOption.label[locale] || toneOption.label["en-US"];
    const titles =
      "  - " +
      (realEstateTone[tone][locale] || realEstateTone[tone]["en-US"]).join(
        "\n  - ",
      );
    prompt = `If a property is old and needs refurbishing, avoid overly optimistic language or terms usually linked with luxury. Instead, use more realistic and honest terms to depict its condition. For an average property, the same principle applies. For exceptional and luxurious properties, feel free to use words such as "outstanding" or "luxurious" to accurately convey its quality. Avoid describing an average or old property using terms generally associated with luxury. Also, refrain from labeling a property with poor energy efficiency as eco-friendly.

The overall tone of your descriptions should mirror "${label}". Below are some example titles:
${titles}`;
  }

  return prompt;
}
