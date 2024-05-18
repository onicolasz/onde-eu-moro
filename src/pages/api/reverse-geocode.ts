import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng } = req.query;

  console.log("Request received with coordinates:", lat, lng);

  if (typeof lat !== "string" || typeof lng !== "string") {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid coordinates format" });
  }

  try {
    const { data } = await client.reverseGeocode({
      params: {
        latlng: [latitude, longitude],
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      },
    });

    if (data.results.length > 0) {
      const address = data.results[0].formatted_address;
      console.log("Found address:", address);
      return res.status(200).json({ address: address });
    } else {
      console.log("No address found for coordinates:", lat, lng);
      return res.status(404).json({ error: "Address not found" });
    }
  } catch (err) {
    console.error("Error fetching reverse geocode:", err);
    return res.status(500).json({ error: "Failed to fetch reverse geocode" });
  }
}
