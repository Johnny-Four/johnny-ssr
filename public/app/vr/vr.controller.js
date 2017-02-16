(function() {
    'use strict';

    angular
        .module('app')
        .controller('VRController', VRController);


    function VRController() {
        const vm = this;
        vm.$onInit = function() {}

        var container = document.getElementById('vr-canvas');
        var container2 = document.getElementById('vr-canvas2');
        var canvas = document.createElement("canvas");
        var canvas2 = document.createElement("canvas");
        container.appendChild(canvas);
        container2.appendChild(canvas);

        // Create h264 player
        var uri = "ws://" + document.location.host;
        var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
        var wsavc2 = new WSAvcPlayer(canvas2, "webgl", 1, 35);
        wsavc.connect(uri);
        wsavc2.connect(uri);

        //expose instance for button callbacks
        window.wsavc = wsavc;
        window.wsavc2 = wsavc2;
    }

})();
