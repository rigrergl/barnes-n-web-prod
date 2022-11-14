import type { NextApiRequest, NextApiResponse } from "next";
import verifyToken from '@/lib/verifyToken';
import getCookieByName from "@/lib/getCookieByName";


export default async (req: NextApiRequest, res: NextApiResponse) => { 
    const cookie = req.headers.cookie || "";
    const accessToken = getCookieByName('accessToken', cookie)

    verifyToken(accessToken);
}