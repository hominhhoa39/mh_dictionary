var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var dictionary = require('./routes/dictionary');
var conf = require('./util/config');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// public フォルダーを公開する
app.use(express.static('WebContents'));

app.use('/npm', express.static(path.join(__dirname, 'node_modules')));

app.listen(conf.PORT, () => {
    console.log('Listening on port ' + conf.PORT);
});

app.get('/auto/:search', dictionary.find);