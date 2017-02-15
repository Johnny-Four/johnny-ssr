const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});
board.on('ready', () => {
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
  module.exports = {
    moveForward: function (){
      console.log("Controls moving the car");
      motors.forward(255);
      board.wait(5000, () => {
        motors.stop();
        motors.reverse(255);
  });
    }



  }
});
