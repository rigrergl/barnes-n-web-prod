import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Set-Cookie", "accessToken=deleted; path=/api; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=strict; HttpOnly=true; Secure=true");
    res.status(200).send({message: "Successfully logged out"});
}