import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.query;

  try {
    const events = await prisma.event.findMany();

    const eventsTransform = events.map((event) => {
      return {
        ...event,
        latitude: event.latitude.toNumber(),
        longitude: event.longitude.toNumber(),
        radius: event.radius.toNumber(),
      };
    });

    res.status(200).json(eventsTransform);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
