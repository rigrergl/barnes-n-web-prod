import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/lib/db";
import secureLog from "../../../../lib/SecureLog";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method;

  switch (httpMethod) {
    case "GET":
      await GET(req, res);
      break;
    case "POST":
      await POST(req, res);
      break;
    case "DELETE":
      await DELETE(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const query = "SELECT username FROM Users";

  try {
    connectionPool.query(
      query,
      function (error: any, results: any, fields: any) {
        if (error) throw error;
        results = results.map((v: any) => Object.assign({}, v));
        res.status(200).json(results);
      }
    );
  } catch (error) {
    secureLog(error);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  //TODO
  res.status(200).json({});
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  //TODO
  res.status(200).json({});
}
