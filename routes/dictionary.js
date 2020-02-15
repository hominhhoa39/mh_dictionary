const mongoose = require('mongoose');
var conf = require('../util/config');

var connectString = conf.CONNECT_STRING;
mongoose
    .connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to the DB', err));

const wordSchema = new mongoose.Schema({}, { strict: false, versionKey: false });
const Word = mongoose.model('Word', wordSchema, 'words_10related');

async function getWords(partOfWord) {
    const words = await Word.find({word: new RegExp(partOfWord, 'i') }).limit(conf.WORD_DISPLAY_NUMBER);
    return words;
}

exports.find = function (req, res) {
    var pWord = req.params.search;
    getWords(pWord).then((datas) => {
        res.send(datas);
    });
}
