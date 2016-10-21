(function(){
	app.controller('test', controller);
	controller.$inject = ['$scope'];

	function controller($scope){
		$scope.testvar = 'Bro';
	}
	
	
})();