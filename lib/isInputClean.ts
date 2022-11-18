export default (input: String) : boolean => {
    if (!input || typeof input != "string") {
        return true;
    } else if (input.includes("'") || input.includes("--") || input.includes(";")) {
        return false;
    } else {
        return true;
    }
}