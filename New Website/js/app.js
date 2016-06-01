angular.module('homePage',['ngRoute','ngSanitize'])
  .config(function($routeProvider){
    $routeProvider
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'mainCtrl'
      })
      .when('/coding', {
        templateUrl: 'partials/coding.html',
        controller: 'codingCtrl'
      })
      .when('/games', {
        templateUrl: 'partials/games.html',
        controller: 'gamesCtrl'
      })
      .when('/images', {
        templateUrl: 'partials/images.html',
        controller: 'imagesCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      })
  })
  .controller('mainCtrl', function($scope){
    $scope.message = 'this is main';
    $scope.numbers = [1,2,3,4,5];
    $scope.articles = dataArticles;
  })
  .controller('codingCtrl', function($scope){
    $scope.message = 'this is coding';
    $scope.test = '<span>test</span><a>test</a>';
    $scope.coding = dataCoding;
  })
  .controller('gamesCtrl', function($scope){
    $scope.message = 'this is games';
    $scope.games = dataGames;
  })
  .controller('imagesCtrl', function($scope){
    $scope.message = 'this is images';
    $scope.images = dataImages;
  })