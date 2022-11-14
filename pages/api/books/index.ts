import type { NextApiRequest, NextApiResponse } from "next";
import books from "../../../mock-data/books";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(books);
};
