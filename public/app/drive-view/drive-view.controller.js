(function() {
    'use strict';

    angular
        .module('app')
        .controller('DriveViewController', DriveViewController);


    function DriveViewController() {
        const vm = this;
        const socket = io.connect('http://localhost:1234');
        
        vm.$onInit = function() {
            console.log('drive me ooooh')



            socket.on('pong', function (data) {
                console.log("pong");
            });

            vm.forward = function() {
              socket.emit('ping', { duration: 2 });

            };



            var container = document.getElementById('view-canvas');
            var canvas = document.createElement("canvas");
            container.appendChild(canvas);

            // Create h264 player
            var uri = "ws://" + document.location.host;
            var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
            wsavc.connect(uri);

            //expose instance for button callbacks
            window.wsavc = wsavc;
        }

    }

})();
