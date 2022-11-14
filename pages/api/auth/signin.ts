import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/lib/db"

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
/*
      Request Body:
       - username
       - hashedPassword

      Response
          - accessToken
  */

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body;

    //Get the hashedPassword from db
    const query = `SELECT user_id, hashedPassword from Users WHERE username = '${username}'`;
    try {
        connectionPool.query(
            query,
            (error: any, results: any, _fields: any) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    return res.status(401).send({
                        message: "User does not exist"
                    });
                }

                const { user_id, hashedPassword } = results[0];
                const salt = bcrypt.getSalt(hashedPassword);
                const reqHashedPassword = bcrypt.hashSync(password, salt);
                const isPasswordValid = (hashedPassword === reqHashedPassword);

                if (!isPasswordValid) {
                    return res.status(401).send({
                        message: "Invalid password!"
                    });
                }

                const privateKeyBase64: String = process.env.SERVER_PRIVATE_KEY || "";
                const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf8')

                const token = jwt.sign({ user_id: user_id }, privateKey, {
                    expiresIn: 86400, // 24 hours
                    algorithm: 'RS256'
                })

                let now = new Date();
                let time = now.getTime();
                let cookieExpireTime = time + (1000 * 3600 * 24); // expires 24 hours from now
                let cookieExpireDate = new Date(cookieExpireTime);
                res.setHeader("Set-Cookie", `accessToken=${token}; SameSite=Strict; Expires=${cookieExpireDate.toUTCString()}; Path=/api; HttpOnly=true; Secure=true`)
                return res.status(200).send({ message: "Logged in successfully" });
            }
        );
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}