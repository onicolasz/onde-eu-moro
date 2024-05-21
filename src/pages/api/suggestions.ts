import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { input } = req.query;

  console.log("testee-sugestao: ", input);

  await axios
    .get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
      params: {
        input: input,
        types: "address",
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        language: "pt-BR",
      },
    })
    .then(({ data }) => {
      const suggestions = data.predictions.map(
        (prediction: any) => prediction.description
      );
      return res.status(200).json(suggestions);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Failed to address suggestions" });
    });
}
