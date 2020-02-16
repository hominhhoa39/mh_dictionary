module.exports = Object.freeze({
    PORT: process.env.PORT || 3000,
    CONNECT_STRING: 'mongodb+srv://mhWordsAdmin:MHW0rdzAdmin20@cluster0-v3o5a.mongodb.net/test?retryWrites=true&w=majority',
    //"mongodb://localhost:27017/minho_dict",
    WORD_DISPLAY_NUMBER: process.env.WORDS_DISP_NUMBER || 10
});
