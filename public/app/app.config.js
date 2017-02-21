(function() {
    'use strict';

    angular.module('app').config(config)

    function config($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        $locationProvider.html5Mode(true)

        var customPrimary = {
            '50': '#404040',
            '100': '#333333',
            '200': '#262626',
            '300': '#1a1a1a',
            '400': '#0d0d0d',
            '500': '#000000',
            '600': '#000000',
            '700': '#000000',
            '800': '#000000',
            '900': '#000000',
            'A100': '#4d4d4d',
            'A200': '#595959',
            'A400': '#666666',
            'A700': '#000000'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#0b0d27',
            '100': '#10143b',
            '200': '#151b50',
            '300': '#1b2264',
            '400': '#202878',
            '500': '#262f8c',
            '600': '#303db4',
            '700': '#3644c8',
            '800': '#4956ce',
            '900': '#5d69d4',
            'A100': '#303db4',
            'A200': '#2B36A0',
            'A400': '#262f8c',
            'A700': '#727bd9'
        };
        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        var customWarn = {
            '50': '#c36662',
            '100': '#bc5450',
            '200': '#af4843',
            '300': '#9d403c',
            '400': '#8a3935',
            '500': '#D7972B',
            '600': '#662927',
            '700': '#532220',
            '800': '#411a19',
            '900': '#2e1312',
            'A100': '#ca7875',
            'A200': '#d18a87',
            'A400': '#d89c9a',
            'A700': '#1c0b0b'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')

        $stateProvider
            .state({
                name: 'app',
                abstract: true,
                component: 'app',
            })
            .state({
                name: 'home',
                parent: 'app',
                url: '/',
                component: 'cameraView',
            })
            .state({
                name: 'drive',
                parent: 'app',
                url: '/drive',
                component: 'driveView',
            })
            .state({
                name: 'signup',
                parent: 'app',
                url: '/signup',
                component: 'formView',
            })
            .state({
                name: 'login',
                parent: 'app',
                url: '/login',
                component: 'formView',
            })
    }

}());
