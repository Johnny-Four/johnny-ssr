(function() {
    'use strict';

    angular
        .module('app')
        .controller('CameraController', CameraController);


    function CameraController() {
        const vm = this;
        vm.$onInit = function() {
            var container = document.getElementById('vr-canvas');
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
