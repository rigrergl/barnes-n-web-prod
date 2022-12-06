export default (password: string) : boolean  => {
    const specialCharacterRegex = /\$|@|#|%|&|!|\*/;
    const digitRegex = /\d/;

    if (password.length < 8 || password.length > 20) {
        return false;
    } else if (password.match(specialCharacterRegex) === null) {
        return false;
    } else if  (password.match(digitRegex) === null) {
        return false;
    }

    return true;
}