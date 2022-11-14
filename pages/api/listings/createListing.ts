import type { NextApiRequest, NextApiResponse } from "next";
import getCookieByName from "@/lib/getCookieByName";
import verifyToken from '@/lib/verifyToken';
import connectionPool from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;

    if (httpMethod != 'POST') {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${httpMethod} not allowed, only POST is allowed for security reasons`);
    }

    let { title, isbn10, isbn13, image, author, maxDueDate } = req.body;

    const cookie = req.headers.cookie || "";
    const accessToken = getCookieByName('accessToken', cookie);

    const decodedToken = verifyToken(accessToken);
    const userId = decodedToken.user_id;
    
    if (isbn10 === "") {
        isbn10 = null;
    }

    // const query = `CALL CreateListing(${userId}, '${title}', 'POINT(${latitude} ${longitude})', '${isbn10}', '${isbn13}', '${image}', '${author}', STR_TO_DATE('${maxDueDate}', '%d %m %Y'))`
    const query = `CALL CreateListing(${userId}, '${title}', '${isbn10}', '${isbn13}', '${image}', '${author}', STR_TO_DATE('${maxDueDate}', '%d %m %Y'))`

    try {
        connectionPool.query(
            query,
            (error: any, results: any, _fields: any) => {
                if (error) {
                    throw error;
                }

                res.status(200).json(results[0]);
            }
        );
    } catch (error: any) {
        res.status(500).end({ message: error.message });
    }
}