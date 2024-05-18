import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;

  console.log("testee1: ", address);

  await client
    .geocode({
      params: {
        address: address as string,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      },
    })
    .then(({ data }) => {
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return res
          .status(200)
          .json({ latitude: location.lat, longitude: location.lng });
      }
      return res.status(404).json({ error: "Address not found" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch geocode" });
    });

  /*
  try {
    const response = await client.geocode({
      params: {
        address: address as string,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      },
    });

    console.log("testee3", response);

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      res.status(200).json({ latitude: location.lat, longitude: location.lng });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch geocode" });
  }
  */
}
