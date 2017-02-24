(function() {
    'use strict';

    angular
        .module('app')
        .controller('FormController', FormController);


    function FormController($location, formService, $state) {
        const vm = this;

        vm.$onInit = function() {
            if ($location.path() === '/signup') {
                vm.greeting = "SIGNUP"
            } else {
                vm.greeting = "LOGIN"
            }
        }

        vm.submitForm = function() {
            if ($location.path() === '/signup') {
                formService.addUser(vm.user).then(function(data) {
                    if (data.status === 409) {
                        vm.error = data.data
                    } else {
                        $state.go('drive')
                    }
                })
            } else {
                formService.loginUser(vm.user).then(function(data) {
                    if (data.status === 409) {
                        vm.error = data.data
                    } else {
                        $state.go('drive')
                    }
                })
            }
        }


    }



})();
