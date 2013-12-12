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
// saleAssistant.run(['$rootScope', '$firebaseAuth', '$firebase', function($rootScope, $firebaseAuth, $firebase) {
// 	var ref = new Firebase('https://mdd-project.firebaseio.com');
// 	$rootScope.auth = $firebaseAuth(ref);

// 	console.log('done');
// }]);

saleAssistant.controller('user', function($rootScope, $scope) {
	console.log('got it');

	var userRef = new Firebase('http://mdd-project.firebaseio.com/users')
	var auth = new FirebaseSimpleLogin(userRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	  } else {
	    // user is logged out
	  }
	});

	$scope.register = function($email, $pass) {
		console.log($email, $pass);
		auth.createUser($email, $pass, function(error, user) {
			if(!error) {
				console.log('registered');
			}else {
				console.log('error on register');
			}
		});
	};

	$scope.signin = function($email, $pass) {
		auth.login('password', {
			email: $email,
			password: $pass
		});
	};
});

