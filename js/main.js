(function(angular) {
  angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
      // 配置请求白名单 对于本站一定要加上self表示本站
      $sceDelegateProvider.resourceUrlWhitelist([
        'self', // 配置支持本站内部的，否则本站内都不允许请求
        'http://127.0.0.1:3000/**'
      ]);
    }]) // 轮播图控制器
    .controller('CarouselDemoCtrl', ['$scope', function($scope) {
      $scope.myInterval = 2000;
      $scope.noWrapSlides = false;
      $scope.active = 0;
      $scope.noTransiton = false;
      var slides = $scope.slides = [];
      var currIndex = 0;

      $scope.addSlide = function() {
//        var newWidth = 600 + slides.length + 1;
        slides.push({
          image: '/images/' + (slides.length + 1) + '.jpg',
          text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
          id: currIndex++
        });
      };
      for (var i = 0; i < 8; i++) {
        $scope.addSlide();
      }
    }])
    .controller('ListController', [
      '$scope',
      '$http',
      '$route',
      '$window',
      function($scope, $http, $route, $window) {
        $scope.contacts = [];
        $http.get('/api/contacts')
          .then(function(data) {
            $scope.contacts = data.data.result;
          })
        $scope.remove = function(id) {
          if (!$window.confirm('Are you sure?')) {
            return
          }
          var finalUrl = '/api/contacts/' + id;
          $http.delete(finalUrl)
            .then(data => {
              //console.log(data);
              if (data.data.err_code === 0) {
                // $window.history.go(0) // 这种方式会造成页面刷新
                // 如果需要当前局部的页面数据改变刷新一下，其实也就是让路由重载执行一遍就可以了
                // 通过使用 $route 提供的 reload() 方法可以重新执行当前路由
                $route.reload()
              }
            })
        }
      }
    ])
    .controller('AddController', [
      '$scope',
      '$http',
      '$window',
      function($scope, $http, $window) {
        $scope.form = {};
        $scope.add = function(form) {
          $http.post('/api/contacts', form)
            .then(function(data) {
              console.log(data);
              if (data.data.err_code === 0) {
                $window.history.back();
              }
            })
        }
      }
    ])
    .controller('EditController', [
      '$scope',
      '$routeParams',
      '$http',
      '$window',
      function($scope, $routeParams, $http, $window) {
        $scope.form = {};
        var id = $routeParams.id;
        var finalUrl = '/api/contacts/' + id;
        $http.get(finalUrl)
          .then(function(data) {
            console.log('majunchang');
            $scope.form = data.data.result;
          })
        $scope.update = function(form) {
          $http.patch(finalUrl, form)
            .then(function(data) {
              console.log(data);
              if (data.data.err_code === 0) {
                $window.history.back();
              }
            })
        }
      }
    ])
})(angular)