var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')

var dictionary = require('./routes/dictionary');
var conf = require('./util/config');

var app = express();

var whitelist = ['https://mh-dictionary.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/products', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'});
})

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