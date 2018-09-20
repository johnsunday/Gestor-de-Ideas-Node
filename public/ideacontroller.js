var app = angular.module('IdeasApp', []);
app.controller('ideasController', function($scope, $http) {
		$scope.ideas= [];
		$scope.formData = {};

		//$http.get('/api/ideas')
		//.success(console.log($scope.ideas))


$http.get('/api/ideas')
	 .success(function(data) {
			 $scope.ideas = data;
			 console.log('ESTOY ACA... ' + data);
	 })
	 .error(function(data) {
			 console.log('Error: ' + data);
 	 });


$scope.crearIdea = function() {

	 console.log($scope.formData);
 		 $http.post('/api/ideas', $scope.formData)
 				 .success(function(data) {
 						 $scope.formData = {};
 						 $scope.ideas = data;

 				 })
 				 .error(function(data) {
 						 console.log('Error: ' + data);
 				 });
};



});
