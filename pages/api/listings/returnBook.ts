import connectionPool from '@/lib/db';
import getCookieByName from '@/lib/getCookieByName';
import verifyToken from '@/lib/verifyToken';
import { TokenExpiredError } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { listingId } = req.body;
    const cookie = req.headers.cookie || "";
    const accessToken = getCookieByName("accessToken", cookie);
    let decodedToken;

     // validate input
     if (!listingId) {
        return res.status(400).send({
            error: true,
            message: "Missing listingId parameter"
        });
    }

    // users can only do this action if they are logged in 
    if (!accessToken) {
        return res.status(401).send({
            error: true,
            message: "Cannot return a book because you are not logged in"
        });
    }

    try {
        decodedToken = await verifyToken(accessToken);
    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).send({
                errror: true,
                message: "Access token has expired. Please log in again"
            })
        } else {
            return res.status(401).send({
                errror: true,
                message: "Unknown error with token. Please log in again"
            })
        }
    }

    // at this point, originator is authenticated
    const query = `UPDATE Listings SET rented_by=NULL WHERE listing_id=${listingId}`;

    connectionPool.query(query, (error: any, _results: any, _fields: any) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: error.message
            });
        } else {
            return res.status(200).send({
                error: false,
                message: "Successfully returned book"
            });
        }
    });
}