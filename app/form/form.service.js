(function() {
    'use strict';

    angular
        .module('app')
        .service('formService', formService)

    function formService($http) {
        this.loginUser = function(data) {
            return $http({
                url: '/users',
                method: "POST",
                data: data
            }).then(function(data) {
                return data
            }).catch(function(data) {
                return data
            });
        }

        this.addUser = function(data) {
            return $http({
                url: '/users/signup',
                method: "POST",
                data: data
            }).then(function(data) {
                return data
            }).catch(function(data) {
                return data
            })
        }
    }

}())
