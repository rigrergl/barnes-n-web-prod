import connectionPool from '@/lib/db';
import getCookieByName from '@/lib/getCookieByName';
import verifyToken from '@/lib/verifyToken';
import { TokenExpiredError } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const cookie = req.headers.cookie || "";
    const accessToken = getCookieByName("accessToken", cookie);
    let decodedToken;

    if (!accessToken) {
        return res.status(401).send({
            error: true,
            message: "Access token not found, please log in again"
        });
    }

    try {
        decodedToken = await verifyToken(accessToken);
    } catch (err: any) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).send({
                error: true,
                message: "Token expired, please log in again"
            });
        }
    }

    // At this point, user is authenticated
    const query = `SELECT * FROM Listings WHERE owner_id=${decodedToken.user_id}`;
    
    connectionPool.query(query, (error: any, results: any, _fields: any) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: error.message
            });
        }

        return res.status(200).json(results);
    });
}