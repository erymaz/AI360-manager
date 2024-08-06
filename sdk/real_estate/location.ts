const POI_NUM_DICT = {
  bus_station: 2,
  subway_station: 2,
  transit_station: 2,
  train_station: 2,
  tourist_attraction: 3,
  natural_feature: 3,
};

/**
 * Fetches and prints a list of points of interest (POIs) for a given address.
 * @param {string} address - The address to find nearby POIs.
 * @param {string} apiKey - The Google Maps API key.
 * @returns {string} - A formatted string containing the name, distance, and duration of each POI.
 */
export async function printLocationPOI(address: string, apiKey: string) {
  const location = await fetchLocation(address, apiKey);
  const { lat, lng } = location;

  const promises = Object.entries(POI_NUM_DICT).map(async ([poiType, num]) => {
    return await fetchPOIs(lat, lng, poiType, num, apiKey);
  });

  const results = await Promise.all(promises);
  let places = "";
  results.flat().forEach(({ name, distance, duration }) => {
    places += `${name}, ${distance}, ${duration}\n`;
  });

  return places;
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
  apiKey: string,
) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=30000&type=${poiType}&rankby=prominence&key=${apiKey}`;

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

/**
 * Retrieves the region and localities associated with a given address using the Google Geocoding API.
 *
 * @param {string} address - The address for which the region and localities should be fetched.
 * @returns {Promise<string>} A promise that resolves to a string containing the region and localities separated by commas.
 * @throws {Error} If there's an issue fetching the data from the Google Geocoding API or processing the response.
 */
export async function getRegion(address: string) {
  const regions = [];
  const localities = [];

  try {
    const apiKey = `${process.env.GOOGLE_MAPS_API_KEY}`;
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    url.searchParams.append("address", address);
    url.searchParams.append("key", apiKey);

    const response = await fetch(url);
    const geocode_data = await response.json();

    if (geocode_data.status === "OK") {
      const components = geocode_data.results[0].address_components;
      for (const component of components) {
        const types = component.types;
        const name = component.long_name;
        if (types.includes("administrative_area_level_3")) {
          regions.push(name);
          continue;
        }
        if (types.includes("administrative_area_level_2")) {
          regions.push(name);
          continue;
        }
        if (types.includes("administrative_area_level_1")) {
          regions.push(name);
          break;
        }
      }

      for (const component of components) {
        const types = component.types;
        const name = component.long_name;
        if (types.includes("sublocality") && !regions.includes(name)) {
          localities.push(name);
          continue;
        }
        if (types.includes("locality") && !regions.includes(name)) {
          localities.push(name);
          break;
        }
      }
    }
  } catch (error) {
    console.error(`Error in getRegion: ${error}`);
  }

  localities.push(...regions);
  let region = localities.join(", ");
  if (!region) {
    region = address;
  }

  return region;
}
