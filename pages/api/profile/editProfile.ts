import connectionPool from "@/lib/db";
import getCookieByName from "@/lib/getCookieByName";
import isInputClean from "@/lib/isInputClean";
import verifyToken from "@/lib/verifyToken";
import { TokenExpiredError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { phone, email, street, optaddress, city, state, zipcode } = req.body;

    if (!isInputClean(phone) ||
    !isInputClean(email) ||
    !isInputClean(street) ||
    !isInputClean(optaddress) ||
    !isInputClean(city) ||
    !isInputClean(state) ||
    !isInputClean(zipcode)) {
        return res.status(422).send({
        error: true,
        message: "Input contains SQL escape characters. Rejected"
    });
}

    const cookie = req.headers.cookie || "";
    const accessToken = getCookieByName("accessToken", cookie);
    let decodedToken;

    // users can only edit their own profile information
    if (!accessToken) {
        return res.status(401).send({
            error: true,
            message: "Cannot edit profile information because user is not logged in"
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
        }
    }

    // at this point, we have authenticated the user
    const query = `CALL EditProfile(${decodedToken.user_id}, '${phone}', '${email}', '${street}', '${optaddress}', '${city}', '${state}', '${zipcode}')`;
    connectionPool.query(query, (error: any, results: any, fields: any) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: error.message
            });
        } 

        return res.status(200).send({
            error: false,
            message: "Profile successfully edited"
        });
    });
}