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
		.otherwise({redirectTo: '/'});

		// $locationProvider.html5Mode(true);
});

// Resources
saleAssistant.run(['$rootScope', '$firebaseAuth', '$firebase', function($rootScope, $firebaseAuth, $firebase) {
	$rootScope.user = {};

	console.log('done');
}]);

saleAssistant.controller('user', function($rootScope, $scope, $firebaseAuth, $location) {
	console.log('got it');

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
	  } else {
	    // user is logged out
	  }
	});
});

