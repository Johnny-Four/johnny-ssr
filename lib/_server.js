"use strict";
const WebSocketServer = require('ws').Server;
const Splitter        = require('stream-split');
const merge           = require('mout/object/merge');
const init = require('./initPi.js').init
const moveForward = require('./carControls.js').moveForward
const NALseparator    = new Buffer([0,0,0,1]);//NAL break
const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});
class _Server {

  constructor(server, options) {


    this.options = merge({
        width : 960,
        height: 540,
    }, options);

    this.wss = new WebSocketServer({ server });

    this.board = board.on('ready', () => {
        console.log("forward plz");
        var motors = new five.Motors([{
          pins: {
            dir: 'P1-36',
            pwm: 'P1-32'
          },
          invertPWM: true
        }, {
          pins: {
            dir: 'P1-40',
            pwm: 'P1-35',
          },
          invertPWM: true
        }]);

        board.repl.inject({
          motors: motors
        });
      });

    this.new_client = this.new_client.bind(this);
    this.start_feed = this.start_feed.bind(this);
    this.broadcast  = this.broadcast.bind(this);

    this.wss.on('connection', this.new_client);
  }


  start_feed() {
    var readStream = this.get_feed();
    this.readStream = readStream;

    readStream = readStream.pipe(new Splitter(NALseparator));
    readStream.on("data", this.broadcast);
  }

  get_feed() {
    throw new Error("to be implemented");
  }

  broadcast(data) {
    this.wss.clients.forEach(function(socket) {

      if(socket.buzy)
        return;

      socket.buzy = true;
      socket.buzy = false;

      socket.send(Buffer.concat([NALseparator, data]), { binary: true}, function ack(error) {
        socket.buzy = false;
      });
    });
  }


  new_client(socket) {

    var self = this;
    console.log('New guy');

    socket.send(JSON.stringify({
      action : "init",
      width  : this.options.width,
      height : this.options.height,
    }));

    socket.on("message", function(data){
      var cmd = "" + data, action = data.split(' ')[0];
      console.log("Incomming action '%s'", action);

      if(action == "REQUESTSTREAM")
        self.start_feed();
      if(action == "STOPSTREAM")
        self.readStream.pause();
      if(action == "FORWARD")
          console.log("car moving forward");
          this.board.motors.forward(255);
      if(action == "LEFT")
        console.log("car moving to the left");
      if(action == "RIGHT")
          console.log("car moving to the right");
      if(action == "BACKWARD")
            console.log("car moving bacward");

    });


    socket.on('close', function() {
      self.readStream.end();
      console.log('stopping client interval');
    });
  }
};


module.exports = _Server;
