
const getCookieByName = (cookieName: String, cookies: String) : String => {
    let result = '';
    cookies?.split(';').forEach((element) => {
        let [key, value] = element.split('=');
        if (key.trim() == cookieName) {
            result = value;
        }
    });

    return result;
}

export default getCookieByName;