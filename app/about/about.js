'use strict';

angular.module('myApp.about', [
    'ngRoute'
])

.controller('AboutCtrl', AboutCtrl);
function AboutCtrl($scope, $rootScope, $cookies, $log) {
    $log.warn('aboutCTRL start');
    $rootScope.curPath = 'about';
    $log.warn('aboutCTRL stop');
}