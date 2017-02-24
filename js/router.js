(function(angular) {
  angular.module('app')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/list.html',
          controller: 'ListController'
        })
        .when('/add', {
          templateUrl: 'views/add.html',
          controller: 'AddController'
        })
        .when('/edit/:id', {
          templateUrl: 'views/edit.html',
          controller: 'EditController'
        })
        .when('/my',{
          templateUrl: 'views/myMusic.html'
        })
       .when('/friend',{
          templateUrl: 'views/friend.html'
        })
       .when('/store',{
          templateUrl: 'views/musicStore.html'
        })
       .when('/musicman',{
          templateUrl: 'views/musicMan.html'
        })
       .when('/download',{
          templateUrl: 'views/download.html'
        })
      .otherwise({
        redirect: '/'
      })
      $locationProvider.html5Mode(true);
    }])
})(angular)