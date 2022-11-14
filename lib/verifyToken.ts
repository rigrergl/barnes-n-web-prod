const jwt = require('jsonwebtoken');
import secureLog from '@/lib/SecureLog';

const publicKeyBase64: String = process.env.SERVER_PUBLIC_KEY || "";
const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf8');

var verifyToken = (token: any) => {
    try {
        const decoded = jwt.verify(token, publicKey);
        return decoded;
    } catch (err) {
        throw err;
    }
}

export default verifyToken;