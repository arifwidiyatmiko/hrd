(function(){
	app.controller('ProfileCtrl', controller);
	controller.$inject = ['$scope', '$alert', '$auth', 'Account'];

	function controller($scope, $alert, $auth, Account){

	    $scope.getProfile = function() {
	     	Account.getProfile(function(err, data){
	      		if(data) $scope.user = data;
	      	
	      		if(err){
	        		$alert({
	            		content: error.message,
	            		animation: 'fadeZoomFadeDown',
	            		type: 'material',
	            		duration: 3
	          		});	      		
	      		}
	      	});
	    };		
		
	    /**
	     * Get user's profile information.
	     */
	    /*
	    $scope.getProfile = function() {
	      Account.getProfile()
	        .success(function(data) {
	          $scope.user = data;
	        })
	        .error(function(error) {
	          $alert({
	            content: error.message,
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        });
	    };
	    */
	
	    /**
	     * Update user's profile information.
	     */
	    $scope.updateProfile = function() {
	      Account.updateProfile({
	        displayName: $scope.user.displayName,
	        email: $scope.user.email
	      }).then(function() {
	        $alert({
	          content: 'Profile has been updated',
	          animation: 'fadeZoomFadeDown',
	          type: 'material',
	          duration: 3
	        });
	      });
	    };
	
	    /**
	     * Link third-party provider.
	     */
	    $scope.link = function(provider) {
	      $auth.link(provider)
	        .then(function() {
	          $alert({
	            content: 'You have successfully linked ' + provider + ' account',
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        })
	        .then(function() {
	          $scope.getProfile();
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
	
	    /**
	     * Unlink third-party provider.
	     */
	    $scope.unlink = function(provider) {
	      $auth.unlink(provider)
	        .then(function() {
	          $alert({
	            content: 'You have successfully unlinked ' + provider + ' account',
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        })
	        .then(function() {
	          $scope.getProfile();
	        })
	        .catch(function(response) {
	          $alert({
	            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
	            animation: 'fadeZoomFadeDown',
	            type: 'material',
	            duration: 3
	          });
	        });
	    };
	
	    $scope.getProfile();		
	}

})();