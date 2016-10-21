(function(){
	app.controller('empNew', controller);
	controller.$inject = ['$scope'];

	function controller($scope){
		$scope.pageTitle = 'New Employee';
	}
	
	$scope.clear = function() {
     $scope.religion.selected = undefined;
	};
	
})();