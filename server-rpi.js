"use strict";

/**
 * Run this on a raspberry pi
 * then browse (using google chrome/firefox) to http://[pi ip]:8080/
 */


const http = require('http');
const express = require('express');



const WebStreamerServer = require('./lib/raspivid');

const app = express();
//public website
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor/dist'));


const server = http.createServer(app);
const io = require('socket.io')(server);
const silence = new WebStreamerServer(server);

server.listen(1234);


// Web Socket Connection
io.sockets.on('connection', function (socket) {

  // If we recieved a command from a client to start watering lets do so
  socket.on('ping', function(data) {
      console.log("ping");

      delay = data["duration"];

      // Set a timer for when we should stop watering
      setTimeout(function(){
          socket.emit("pong");
      }, delay*1000);

    });
});
