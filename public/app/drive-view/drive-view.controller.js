(function() {
    'use strict';

    angular
        .module('app')
        .controller('DriveViewController', DriveViewController);


    function DriveViewController($window) {
        const vm = this;
        vm.$onInit = function() {
            vm.show = true;
            var socket = io.connect('10.6.67.156:3000');
            vm.forward = function() {
                socket.emit('forward');
            }

            vm.stop = function() {
                socket.emit('stop');
            }

            vm.reverse = function() {
                socket.emit('reverse');
            }

            vm.right = function() {
                socket.emit('right');
            }

            vm.left = function() {
                socket.emit('left');
            }

            var container = document.getElementById('view-canvas');
            var canvas = document.createElement("canvas");
            container.appendChild(canvas);


            // Create h264 player
            var uri = "ws://" + document.location.host;
            var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
            wsavc.connect(uri);

            //expose instance for button callbacks
            window.wsavc = wsavc;

            vm.keyPress = function() {
                if (event.keyCode === 38) {
                    socket.emit('forward');
                } else if (event.keyCode === 40) {
                    socket.emit('reverse');
                } else if (event.keyCode === 37) {
                    socket.emit('left');
                } else if (event.keyCode === 39) {
                    socket.emit('right');
                }
            }

            vm.keyRelease = function() {
                socket.emit('stop');
            }

            vm.driveMe = function() {
                vm.show = false;
                vm.element = $window.document.getElementById('drive')
                vm.element.focus()
            }
        }


    }

})();
