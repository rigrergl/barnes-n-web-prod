export default (input: String) : boolean => {
    if (input.includes("'") || input.includes("--") || input.includes(";")) {
        return false;
    } else {
        return true;
    }
}