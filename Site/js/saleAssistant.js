var saleAssistant = angular.module('saleAssistant', ['ngRoute', 'firebase']);

saleAssistant.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			controller: 'user',
			templateUrl: 'views/home.html'
		})
		.when('/index.html', {
			controller: 'user',
			templateUrl: 'views/home.html'
		})
		.when('/list', {
			controller: 'user',
			templateUrl: 'views/list.html'
		})
		.when('/search', {
			controller: 'product',
			templateUrl: 'views/add-product.html'
		})
		.otherwise({redirectTo: '/'});

		// $locationProvider.html5Mode(true);
});

// Resources
saleAssistant.run(['$rootScope', '$firebaseAuth', '$firebase', function($rootScope, $firebaseAuth, $firebase) {
	$rootScope.user = {};

	$rootScope.page = 1;
	$rootScope.query = '';
	$rootScope.results = [];

	console.log('done');
}]);


// CONTROLLER :: user
// Controls all user data

saleAssistant.controller('user', function($rootScope, $scope, $firebaseAuth, $location) {
	console.log('controller: user');

	$rootScope.$on("$firebaseAuth:login", function(e, user) {
		console.log("User " + user.id + " successfully logged in!");
		$location.path('/list');
	});

	$rootScope.$on("$firebaseAuth:logout", function(e, user) {
		console.log('logging out current user: ' + $rootScope.user);
		$location.path('/');
	});	

	var userRef = new Firebase('https://mdd-project.firebaseio.com');
	$rootScope.auth = $firebaseAuth(userRef);
	var auth = new FirebaseSimpleLogin(userRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	    $rootScope.user = user;
	    console.log($rootScope.user);
	    if($rootScope.user) {
	    	$location.path('/list');
	    }
	  } else {
	    // user is logged out
	  }
	});
});


// CONTROLLER :: product
// 

saleAssistant.controller('product', function($rootScope, $scope, $http, $firebaseAuth, $location) {
	console.log('controller: product');

	$scope.results = [];

	$scope.getProducts = function($query) {
		$rootScope.query = $query;
		$http.jsonp( 'http://api.remix.bestbuy.com/v1/products(search='+$rootScope.query+')?page='+$rootScope.page+'&format=json&callback=JSON_CALLBACK&apiKey=kqwq2utctj7tpjur4jgq36k2')
		.success(function(data, status, headers, config) {
			// console.log('success: ', data);
			// console.log(data);
			// console.log(data.products);
			for(var i=0; i<(data.to-data.from)+1; i++) {
				$scope.results.push(data.products[i]);
			}
			// $scope.results.push(data.products);
			$rootScope.pages = [];
			for (var i=1; i<data.totalPages; i++) {
				$rootScope.pages.push(i);
			}
		})
		.error(function(data, status, headers, config) {
			console.log('fail: ', data);
		});
	};

	$scope.nextPage = function() {
		$rootScope.page++;
		$scope.getProducts($rootScope.query);
	};

});






















