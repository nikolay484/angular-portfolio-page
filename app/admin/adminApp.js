'use strict';

// Declare app level module which depends on views, and components
angular.module('adminApp', [
    'ngRoute',
    'ngCookies',
 
])
.config(['$routeProvider', '$locationProvider', '$logProvider', function($routeProvider, $locationProvider, $logProvider) {
   $routeProvider

       .when('/admin', {
            templateUrl: 'admin/admin/admin.html',
            controller: 'AdminCtrl'
       })
}])
.controller('AdminDirCtrl', AdminDirCtrl);

function AdminDirCtrl($scope, value, $cookies) {
    $scope.admindir = "admindirCtrl";
}



