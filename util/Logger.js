module.exports = (message, includeDate = true) => {
    if (includeDate) {
        console.log(`[${new Date().toLocaleString()}] ${message}`);
    } else {
        console.log(message);
    }
}