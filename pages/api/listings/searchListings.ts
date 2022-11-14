import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method;

  if (httpMethod != "POST") {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .end(
        `Method ${httpMethod} not allowed, only POST is allowed for security reasons`
      );
  }

  const {
    bookTitle,
    isbn_10,
    isbn_13,
    author,
//   latitude,
//    longitude,
    maxDistanceInMiles,
  } = req.body;
  // const maxDistanceInMeters = 1609.34 * maxDistanceInMiles;

  // const query = `CALL SearchListings('${bookTitle}', '${isbn_10}', '${isbn_13}', '${author}', 'POINT(${latitude} ${longitude})', ${maxDistanceInMeters})`;
  const query = `CALL SearchListings('${bookTitle}', '${isbn_10}', '${isbn_13}', '${author}')`;


  try {
    connectionPool.query(query, (error: any, results: any, _fields: any) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results[0]);
    });
  } catch (error: any) {
    res.status(500).end({ message: error.message });
  }
};
