(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);


    function AppController($mdDialog) {
        const vm = this;
        vm.$onInit = function() {

            vm.isUserLoggedIn = false;

        }

    }

})();
