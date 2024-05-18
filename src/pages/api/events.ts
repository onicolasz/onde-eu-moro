import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.query;

  try {
    const events = [
      {
        latitude: -30.036104,
        longitude: -51.2241612,
        radius: 10.0,
        title: "Incendio no prédio Solar Porto Belo",
        occurred_at: new Date(),
      },
    ];
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
