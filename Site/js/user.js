
var userRef = {};

// var User = function User($scope, $http) {
saleAssistant.controller('user', function($rootScope,$scope) {

	console.log('got it');

	$scope.register = function() {
		console.log(userForm.pass, userForm.pass);
		// if($user != '' && $pass != '') {
		// 	userRef = new Firebase('https://mdd-project.firebaseio.com/users/'+$user);
		// 	userRef.child('password').set($pass);
		// 	userRef.child('type').set('user');
		// }
	};

	$scope.login = function() {
		console.log($user, $pass);
		if($user != '' && $pass != '') {
			userRef = new Firebase('https://mdd-project.firebaseio.com/users/'+$user+'/password');
			userRef.on('value', function(snapshot) {
				if(snapshot.val() === $pass) {
					// login granted
					console.log('login success');
				}else {
					// login DENIED
					console.log('login failure');
				}
			});
		}
	};

// };
});