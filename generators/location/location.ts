import humanizeString from "humanize-string";

interface POIGroup {
  group: string;
  types: string[];
}

interface POIGroupDict {
  [key: string]: POIGroup;
}

const POI_GROUP_DICT: POIGroupDict = {
  bus_range: { group: "public_transportation", types: ["bus_station"] },
  metro_range: {
    group: "public_transportation",
    types: ["subway_station", "transit_station"],
  },
  train_range: { group: "public_transportation", types: ["train_station"] },
  airport_range: { group: "public_transportation", types: ["airport"] },
  food_restaurant: { group: "places_interests", types: ["restaurant"] },
  supermarkets: { group: "places_interests", types: ["supermarket"] },
  schools: { group: "places_interests", types: ["school"] },
  arts_culture: { group: "places_interests", types: ["art_gallery", "museum"] },
  parks_green_areas: {
    group: "places_interests",
    types: ["park", "natural_feature"],
  },
  hospitals_medical: { group: "places_interests", types: ["hospital"] },
  hotels: { group: "staying", types: ["lodging"] },
};

const NUM_POI_PER_TYPE = 3;

function generateIframe(lat: number, lng: number) {
  const iframe = `<iframe src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
  return iframe;
}

/**
 * Fetches and prints a list of points of interest (POIs) for a given address.
 * @param {string} address - The address to find nearby POIs.
 * @param {string} apiKey - The Google Maps API key.
 * @returns {string} - A formatted string containing the name, distance, and duration of each POI.
 */
export async function printLocationPOI(
  formData: Record<string, any>,
  approxAddress: string,
  apiKey: string,
) {
  const address = formData.address;
  const location = await fetchLocation(address, apiKey);
  let { lat, lng } = location;
  let hasAirport = false;

  const promises = Object.entries(formData).flatMap(([formKey, formValue]) => {
    if (
      POI_GROUP_DICT[formKey] &&
      formData[POI_GROUP_DICT[formKey].group] &&
      formValue !== "dont_show"
    ) {
      return POI_GROUP_DICT[formKey].types.map(async (poiType) => {
        const radius = isNaN(Number(formValue)) ? 0 : Number(formValue) * 1000;
        const poiResults = await fetchPOIs(
          lat,
          lng,
          poiType,
          NUM_POI_PER_TYPE,
          radius,
          apiKey,
        );
        if (poiType === "airport" && poiResults.length) {
          hasAirport = true;
        }
        return poiResults;
      });
    } else {
      return [];
    }
  });

  const results = await Promise.all(promises);
  const groupByPoiType: { [key: string]: string[] } = {};
  results.flat().forEach(({ poiType, name, distance, duration }) => {
    if (!groupByPoiType[poiType]) {
      groupByPoiType[poiType] = [];
    }
    groupByPoiType[poiType].push(`  * ${name}, ${distance}, ${duration}`);
  });
  let schoolPlaces = "";
  let transportPlaces = "";
  let otherPlaces = "";
  for (let poiType in groupByPoiType) {
    const humanPoiType = humanizeString(poiType);
    if (poiType === "school") {
      schoolPlaces += `${humanPoiType}:\n`;
      groupByPoiType[poiType].forEach((place) => {
        schoolPlaces += `${place}\n`;
      });
      schoolPlaces += "\n";
    } else if (
      [
        "bus_station",
        "subway_station",
        "transit_station",
        "train_station",
        "airport",
      ].includes(poiType)
    ) {
      transportPlaces += `${humanPoiType}:\n`;
      groupByPoiType[poiType].forEach((place) => {
        transportPlaces += `${place}\n`;
      });
      transportPlaces += "\n";
    } else {
      otherPlaces += `${humanPoiType}:\n`;
      groupByPoiType[poiType].forEach((place) => {
        otherPlaces += `${place}\n`;
      });
      otherPlaces += "\n";
    }
  }
  schoolPlaces = schoolPlaces.trim();
  transportPlaces = transportPlaces.trim();
  otherPlaces = otherPlaces.trim();

  let iframe = "";
  if (formData["embeddable_google_link"]) {
    if (approxAddress) {
      ({ lat, lng } = await fetchLocation(approxAddress, apiKey));
    }
    iframe = generateIframe(lat, lng);
  }

  return { schoolPlaces, transportPlaces, otherPlaces, hasAirport, iframe };
}

/**
 * Fetches the location data for a given address.
 * @param {string} address - The address to fetch location data for.
 * @param {string} apiKey - The Google Maps API key.
 * @returns {Object} - The location object containing latitude and longitude.
 * @throws {Error} - If the address is invalid or the API returns an error.
 */
async function fetchLocation(address: string, apiKey: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address,
  )}&key=${apiKey}`;

  const response = await fetch(url);
  const geocodingData = await response.json();
  const location = geocodingData.results[0]?.geometry?.location;

  if (!location) {
    throw new Error("Invalid address or Google API error.");
  }

  return location;
}

/**
 * Fetches a list of POIs based on the specified parameters.
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @param {string} poiType - The type of POI to search for.
 * @param {number} num - The number of POIs to fetch.
 * @param {string} apiKey - The Google Maps API key.
 * @returns {Array} - An array of POI objects with added distance and duration properties.
 */
async function fetchPOIs(
  lat: number,
  lng: number,
  poiType: string,
  num: number,
  radius: number = 30000,
  apiKey: string,
) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${poiType}&rankby=prominence&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const attractions = data.results.slice(0, num);

  for (const attraction of attractions) {
    const placeId = attraction.place_id;
    const distanceData = await fetchDistance(lat, lng, placeId, apiKey);
    attraction.distance = distanceData.distance.text;
    attraction.duration = await formatDuration(
      distanceData,
      lat,
      lng,
      placeId,
      apiKey,
    );
    attraction.poiType = poiType;
  }

  return attractions;
}

/**
 * Fetches the distance data for a specified place ID and origin location.
 * @param {number} lat - The latitude of the origin location.
 * @param {number} lng - The longitude of the origin location.
 * @param {string} placeId - The place ID of the destination.
 * @param {string} apiKey - The Google Maps API key.
 * @param {string} [mode="driving"] - The mode of transportation. Default is "driving".
 * @returns {Object} - The distance data object containing distance and duration.
 */
async function fetchDistance(
  lat: number,
  lng: number,
  placeId: string,
  apiKey: string,
  mode: string = "driving",
) {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=place_id:${placeId}&key=${apiKey}&mode=${mode}`;

  const response = await fetch(url);
  const data = await response.json();
  const distanceData = data.rows[0].elements[0];

  return distanceData;
}

/**
 * Formats the duration of a trip based on distance data and transportation mode.
 * @param {Object} distanceData - The distance data object containing distance and duration.
 * @param {number} lat - The latitude of the origin location.
 * @param {number} lng - The longitude of the origin location.
 * @param {string} place_id - The place ID of the destination.
 * @param {string} apiKey - The Google Maps API key.
 * @returns {string} - A formatted string containing the duration and mode of transportation.
 */
async function formatDuration(
  distanceData: Record<string, any>,
  lat: number,
  lng: number,
  place_id: string,
  apiKey: string,
) {
  let duration = distanceData.duration.text;
  let mode = "drive";

  if (distanceData.distance.value < 3000) {
    const walkingUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=place_id:${place_id}&key=${apiKey}&mode=walking`;
    const walkingResponse = await fetch(walkingUrl);
    const walkingData = await walkingResponse.json();
    const walkingDurationValue =
      walkingData["rows"][0]["elements"][0]["duration"]["value"];

    if (walkingDurationValue < 1800) {
      duration = walkingData["rows"][0]["elements"][0]["duration"]["text"];
      mode = "walk";
    }
  }

  return `${duration.replace(" mins", "-min")} ${mode}`;
}
