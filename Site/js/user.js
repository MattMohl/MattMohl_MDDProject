

var User = function User($scope, $http) {

	$scope.register = function($user='', $pass='') {
		console.log($user, $pass);
		if($user != '' && $pass != '') {
			var userRef = new Firebase('https://mdd-project.firebaseio.com/users/'+$user);
			userRef.child('password').set($pass);
			userRef.child('type').set('user');
		}
	};

};