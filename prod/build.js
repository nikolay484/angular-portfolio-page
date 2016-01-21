'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.home',
  'myApp.about',
  'myApp.portfolio',
  'ngCookies',
  'ui.bootstrap',
  'ngAnimate',
  'adminApp',
       'adminApp.admin'
])
//.config(Config)
.config(function($routeProvider, $locationProvider, $logProvider) {
   $routeProvider
       .otherwise({redirectTo : '/'})
       .when('/', {
            templateUrl: 'main/main.html',
            controller: 'HomeCtrl'
       })
       .when('/portfolio', {
            templateUrl: 'portfolio/portfolio.html',
            controller: 'PortfolioCtrl',
            controllerAs: 'portfolio',
            resolve : {
                portfolio_posts: function(ApiService) {
                    return ApiService.getposts();
                },
                media : function(ApiService) {
                    return ApiService.getmedia();
                },
                tags : function(ApiService) {
                    return ApiService.gettags();
                }
        
            }
        })
       .when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutCtrl'
        })
        $locationProvider.html5Mode(false);  // need to enable in future
        $logProvider.debugEnabled(true);
})
.value('value',
        {
            site_title : 'Bestvision.co.il - Nothing is impossible',
            site_author : 'Nikolay waysman',
        })
.controller('AppCtrl', AppCtrl)
.factory('ApiService', getApiFactory);
function AppCtrl($scope, value, $cookies) { 
    $scope.author = value.site_author;
    $scope.title = value.site_title;
    
}

function getApiFactory($http) {
    
     var ApiFactory = {};

        ApiFactory.getposts = function() {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/posts');
        },
        ApiFactory.getmedia = function() {
                return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/media');
        },
        ApiFactory.gettags = function() {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/tags');
        },
        ApiFactory.getPostTags = function(id) {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/posts/' + id + '/tags');
        },
        ApiFactory.getgallery = function() {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/front_gallery/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ApiFactory.getgallerymedia = function() {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/media/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ApiFactory.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/categories',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
         ApiFactory.getCategory = function(cat_name) {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/posts/?filter[slug]='+ cat_name,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }

    
 return ApiFactory;
    
}


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




'use strict';

angular.module('myApp.home', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate'
])
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider
//  
//}])
.controller('HomeCtrl', HomeCtrl)
    .directive('ngFader', function( $interval, ApiService, $sce, $log) {
        function link(scope){
            ApiService.getgallerymedia().then(function(callback) {
                 $sce.trustAsHtml();
                 scope.media = callback;
                 scope.mediadata = callback.data;
                 
             });
            ApiService.getgallery().then(function(callback) {
                $sce.trustAsHtml();
                scope.gallery = callback;
                $log.warn(scope.gallery);
                 scope.numberOfImages = scope.gallery.data.length;
            });
            
            //Set your interval time. 4000 = 4 seconds
            scope.setTime = 4000;
          
         
            

            /*****************************************************
             STOP! NO FURTHER CODE SHOULD HAVE TO BE EDITED
             ******************************************************/

                //Pagination dots - gets number of images
            //scope.numberOfImages = scope.length;
           
            scope.dots = function(num) {
                return new Array(num);
            };

            //Pagination - click on dots and change image
            scope.selectedImage = 0;
            scope.setSelected = function (idx) {
                scope.stopSlider();
                scope.selectedImage = idx;
            };

            //Slideshow controls
            scope.sliderBack = function() {
                scope.stopSlider();
                scope.selectedImage === 0 ? scope.selectedImage = scope.numberOfImages - 1 : scope.selectedImage--;
            };

            scope.sliderForward = function() {
                scope.stopSlider();
                scope.autoSlider();
            };

            scope.autoSlider = function (){
                scope.selectedImage < scope.numberOfImages - 1 ? scope.selectedImage++ : scope.selectedImage = 0;
            };

            scope.stopSlider = function() {
                $interval.cancel(scope.intervalPromise);
                scope.activePause = true;
                scope.activeStart = false;
            };

            scope.toggleStartStop = function() {
                if(scope.activeStart) {
                    scope.stopSlider();
                } else {
                    scope.startSlider();
                }
            };

            scope.startSlider = function(){
                scope.intervalPromise = $interval(scope.autoSlider, scope.setTime);
                scope.activeStart = true;
                scope.activePause = false;
            };
            scope.startSlider();

            scope.show = function(idx){
                if (scope.selectedImage==idx) {
                    return "show";
                }
            };


        }

        return {
            restrict: 'E',
            scope: false,
            template: '<div class="ng-fader">'+
                //images will render here
            '<ul>' +
                '<li ng-repeat="gallery in gallery.data"   ng-click="toggleStartStop()" ng-swipe-right="sliderBack()" ng-swipe-left="sliderForward()">'+
             '<span ng-init="sliderNo = $index"></span>' +
          //ng-repeat="media in media.data" 
            
         //   ng-if="media.id == gallery.featured_image" 
            '<span ng-repeat="media in media.data track by $index">' +
                '<img ng-if="media.id == gallery.featured_image"  data-ng-src="{{media.guid.rendered}}" data-ng-alt="{{ sliderNo }}" ng-class="show(sliderNo)"/>'+
            '</span>' +
               
            
                '</li>' +
            '</ul>' +
                //pagination dots will render here
            '<div class="ng-fader-pagination">' +
            '<ul>' +
            '<li ng-repeat="gallery in gallery.data" ng-class="{current: selectedImage==$index}" ng-click="setSelected($index)"></li>' +
            '</ul>' +
            '</div>' +
                //controls are here
            '<div class="ng-fader-controls">' +
            '<ul>' +
            '<li ng-click="sliderBack()">' +
            '<i class="ngfader-back"></i>' +
            '</li>' +
            '<li ng-click="stopSlider()">' +
            '<i class="ngfader-pause" ng-class="{\'active\': activePause}"></i>' +
            '</li>' +
            '<li ng-click="startSlider()">' +
            '<i class="ngfader-play"  ng-class="{\'active\': activeStart}"></i>' +
            '</li>' +
            '<li ng-click="sliderForward()">' +
            '<i class="ngfader-forward"></i>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>',
            link: link
        };
    });
function HomeCtrl($scope, $rootScope, $cookies, $log, ApiService, $sce) {
    $log.warn('homeCTRL start');
     
    
    $rootScope.curPath = 'main';
    $log.warn('homeCTRL stop');
}



 'use strict';

angular.module('myApp.portfolio', [
    'ngRoute',
    'ngSanitize'
])

.controller('PortfolioCtrl', PortfolioCtrl)
    .controller('PortfolioPopupCtrl',PortfolioPopupCtrl);
 function PortfolioPopupCtrl($scope, $uibModalInstance, posts, media) {

     $scope.post = posts;
     $scope.media = media;
     $scope.data = {
         post: $scope.post,
         media: $scope.media
     };

     $scope.ok = function () {
         $uibModalInstance.close($scope.selected.item);
     };

     $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
     };
 }
function PortfolioCtrl($scope, $rootScope, $cookies, ApiService, $log, $sce, $uibModal, $filter) {
    var vm = this;
    vm.category = '';
    $log.warn('PortfolioCtrl start');
            
    ApiService.getposts()
    .success(function(data) {
        vm.posts = data; 
    });
     ApiService.getmedia()
    .success(function(data) {
        vm.media = data; 
    });
     ApiService.gettags()
    .success(function(data) {
         vm.tags = data; 
    });
    ApiService.getPostTags(133)
    .success(function(data) {
         vm.getPostTags = data; 
    });
         $sce.trustAsHtml();
       //  vm.tags  = tags.data;
        // vm.postTags = postTags;
    vm.animationsEnabled = true;

    vm.open = function (size) {

        var single_post = $filter('filter')(vm.posts, {id:size})[0];
        $log.info(single_post.id);
        var single_media = $filter('filter')(vm.media, {id:single_post.featured_image})[0];
        $log.info(single_media);
        
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'portfolioPopup.html',
            controller: 'PortfolioPopupCtrl',
            resolve: {
                posts: function () {
                    return single_post;
                },
                media: function () {
                    return single_media;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            vm.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    vm.toggleAnimation = function () {
        vm.animationsEnabled = !vm.animationsEnabled;
    };




    //ApiService.getCategory('uncategorized').then(function(callback) {
     //    vm.category = callback.data;
     //});
    $rootScope.curPath = 'portfolio';
    $(document).load(function () {
        var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: 300
        });
        $grid.imagesLoaded().progress( function() {
            $grid.masonry('layout');
        });
    });

    $log.warn('PortfolioCtrl stop');
}


'use strict';

angular.module('adminApp.admin', ['ngRoute'])

//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider
//  
//}])
.controller('AdminCtrl', AdminCtrl);
function AdminCtrl($scope, $rootScope, $cookies, $log) {

$scope.admin = 'hello';
}