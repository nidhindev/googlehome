'use strict';

var app, express, http, proxy, qs, url, mappEndPoint, mappEndPointUAT, bodyParser, request, crypto;

express = require("express");

http = require("http");

qs = require("querystring");

url = require("url");

bodyParser = require('body-parser');

request = require('request');

crypto = require('crypto');


proxy = url.parse('http://proxy:40d8e12f60ba-4318-9503-c8434f4e396f@proxy-54-75-235-187.proximo.io');
mappEndPoint = 'https://api.ute1.klm.com/socialmedia/facebook/';
mappEndPointUAT = 'https://api.ute3.klm.com/socialmedia/facebook/';

console.log('proxy url', proxy);
console.log('mapp end point', mappEndPoint);
console.log('mapp end point for uat', mappEndPointUAT);

app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});


app.get('/', function(req, res) {
    res.send('Hello world')
});
app.post("/googlehome/", function(req, res) {

    var headers, options;
    delete req.headers.host;
    headers = req.headers;
    headers['Proxy-Authorization'] = "Basic " + (new Buffer(proxy.auth).toString("base64"));
    //console.log('Headers', headers);
    console.log('Body \n', JSON.stringify(req.body))
    res.send({
        "speech": "Please provide your pnr.",
        "displayText": "provide pnr for getting the info",
        "source": "my app"
    })

});
