// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoResponse, PhotoResult } from "./photo.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotoResponse>
) {
  if (req.method !== "GET") {
    res.status(404).json({ error: "this method does not exist" });
    return;
  }

  const { q: searchTerm, page, perpage } = req?.query || {};

  const data: PhotoResult = await fetch(
    `${process.env.BACKEND}?key=${process.env.API_KEY}&image_type=photo&q=${searchTerm}&page=${page}&per_page=${perpage}`
  )
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    });

  res.status(200).json({ data });
}
