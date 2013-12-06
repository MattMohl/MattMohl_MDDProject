
var testApp = angular.module('testApp', []);

var TestController = function TestController($scope, $http) {

	$scope.getData = function() {
		$http({
			method: 'GET',
			url: 'http://api.remix.bestbuy.com/v1/products(search=PS4)?apiKey=kqwq2utctj7tpjur4jgq36k2'
		}).success(function(data) {
			$scope.$apply(function() {
				$scope.results = angular.fromJson(data);
			});
		});
	};

};