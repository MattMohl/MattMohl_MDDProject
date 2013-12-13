
var testApp = angular.module('testApp', []);

var TestController = function TestController($scope, $http) {

	$scope.getData = function($query, $page) {
		$http.jsonp( 'http://api.remix.bestbuy.com/v1/products(search='+$query+')?page='+$page+'&format=json&callback=JSON_CALLBACK&apiKey=kqwq2utctj7tpjur4jgq36k2')
		.success(function(data, status, headers, config) {
			console.log('success: ', data);
			$scope.results = data.products;
			$scope.pages = [];
			for(var i=1; i<data.totalPages; i++) {
				$scope.pages.push(i);
			}
		})
		.error(function(data, status, headers, config) {
			console.log('fail: ', data);
		});
	};
};