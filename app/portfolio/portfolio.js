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

