export default (input: String) : boolean => {
    if (!input) {
        return true;
    } else if (input.includes("'") || input.includes("--") || input.includes(";")) {
        return false;
    } else {
        return true;
    }
}