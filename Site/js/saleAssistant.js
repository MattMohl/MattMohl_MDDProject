var saleAssistant = angular.module('saleAssistant', ['ngRoute', 'firebase']);

saleAssistant.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/landing.html'
		})
		.when('/home', {
			templateUrl: 'views/home.html'
		})
		.when('/index.html', {
			templateUrl: 'views/home.html'
		})
		.when('/list', {
			controller: 'product',
			templateUrl: 'views/list.html'
		})
		.when('/search', {
			controller: 'product',
			templateUrl: 'views/add-product.html'
		})
		.otherwise({redirectTo: '/'});
});

saleAssistant.filter('toArray', function () {
	'use strict';
	 
	return function (obj) {
		if (!(obj instanceof Object)) {
			return obj;
		}
	 
		return Object.keys(obj).filter(function(key){if(key.charAt(0) !== "$") {return key;}}).map(function (key) {
		return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
		});
	};
});

// Resources
saleAssistant.run(['$rootScope', '$firebaseAuth', '$firebase', '$location', function($rootScope, $firebaseAuth, $firebase, $location) {
	$rootScope.user = {};

	$rootScope.page = 1;
	$rootScope.query = '';
	$rootScope.results = [];
	$rootScope.products = [];

	var userRef = new Firebase('https://mdd-project.firebaseio.com');
	$rootScope.auth = $firebaseAuth(userRef);

	// On login goto -> /list
	$rootScope.$on("$firebaseAuth:login", function(e, user) {
		console.log("User " + user.id + " successfully logged in!");
		$rootScope.user = user;
		$location.path('/list');
	});

	// On logout goto -> /
	$rootScope.$on("$firebaseAuth:logout", function(e, user) {
		console.log('logging out current user: ' + $rootScope.user);
		$rootScope.user = {};
		$location.path('/');
	});	

	$rootScope.ultimateCheck = function() {
		if(!$rootScope.user.id) {
			console.log('hell no bitch');
			$location.path('/');
		}
	};
}]);


// CONTROLLER :: product
// handles CRUD

saleAssistant.controller('product', function($rootScope, $scope, $http, $firebaseAuth, $location, $firebase, filterFilter) {
	console.log('controller: product');

	$rootScope.ultimateCheck();

	$rootScope.products = $firebase(new Firebase('https://mdd-project.firebaseio.com/products'));

	// $rootScope.userProducts = filterFilter($rootScope.products, $rootScope.user.id)

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

	$scope.addProduct = function($name) {
		console.log($rootScope.user);
		$rootScope.products.$add({'userid':$rootScope.user.id, 'pname':$name, 'status':'Watching'});
		$location.path('/list');
	};

});






















