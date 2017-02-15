(function() {
    'use strict';

    angular
        .module('app')
        .controller('DriveViewController', DriveViewController);


    function DriveViewController() {
        const vm = this;
          const uri = "ws://" + document.location.host;
          const driveSocket = new WebSocket(uri, "driveSocket");
          driveSocket.onopen = (e) => {
            driveSocket.send('something')
          }


        vm.$onInit = function() {
            console.log('drive me ooooh')

            var container = document.getElementById('view-canvas');
            var canvas = document.createElement("canvas");
            container.appendChild(canvas);

            // Create h264 player

            var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
            wsavc.connect(uri);

            //expose instance for button callbacks
            window.wsavc = wsavc;

        }

        vm.moveForward = function () {
          console.log('pressed up arrow');
            driveSocket.send('FORWARD')
          }

        vm.turnLeft = function (){
          console.log('pressed left arrow');
          driveSocket.send('LEFT')
        }
        vm.turnRight = function () {
          console.log('pressed right arrow');
          driveSocket.send('RIGHT')
        }
        vm.moveBackward = function (){
          console.log("pressed down arrow");
          driveSocket.send('BACKWARD')
        }


    }

})();
