module.exports = Object.freeze({
    PORT: process.env.port || 3000,
    CONNECT_STRING: process.env.MONGODB_URI || "mongodb://localhost:27017/minho_dict",
    WORD_DISPLAY_NUMBER: process.env.WORDS_DISP_NUMBER || 10
});