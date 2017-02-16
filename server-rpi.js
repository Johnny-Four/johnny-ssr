"use strict";

/**
 * Run this on a raspberry pi
 * then browse (using google chrome/firefox) to http://[pi ip]:8080/
 */


const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const WebStreamerServer = require('./lib/raspivid');

const users = require('./routes/users')

const app = express();

//public website
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Authorization');
    next();
});

app.use('/users', users);



const server = http.createServer(app);
const silence = new WebStreamerServer(server);
server.listen(80);
