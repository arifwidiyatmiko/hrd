(function(){
	app.controller('LoginCtrl', controller);
	controller.$inject = ['$rootScope', '$scope', '$alert', '$auth', 'appConfig', 'Account'];

	function controller($rootScope, $scope, $alert, $auth, appConfig, Account){
		
		$scope.providers = appConfig.data.providers;
		console.log('$scope.providers: ', $scope.providers);
		
		$scope.login = function() {
	      $auth.login({ identifier: $scope.email, password: $scope.password })
	        .then(function() {
	          $alert({
	            content: 'You have successfully logged in',
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        })
	        .catch(function(response) {
	          $alert({
	            content: response.data.message,
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        });
	    };
	    $scope.authenticate = function(provider) {
	      $auth.authenticate(provider)
	        .then(function() {
		     	Account.getProfile(function(err, data){
		      		if(data){
		      			
		      		  $rootScope.accountProfile = data;

			          $alert({
			            content: 'You have successfully logged in',
			            animation: 'fadeZoomFadeDown',
			            type: 'material',
			            duration: 3
			          });		      			
		      		}
		      	});
	        })
	        .catch(function(response) {
	          $alert({
	            content: response.data ? response.data.message : response,
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        });
	    };		
	}
})();