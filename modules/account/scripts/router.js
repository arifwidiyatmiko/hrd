(function(){
	app.config(config);
	config.$inject = ['$stateProvider', '$authProvider'];

	function config($stateProvider, $authProvider){
		$stateProvider
		.state('account', {
			abstract: true,
			url: '/account',
            views: {
              '': {
                templateUrl: 'views/layout.html'
              }
            }        
		})	
      	.state('account.login', {
        	url: '/login',
        	templateUrl: 'modules/account/views/login.html',
        	controller: 'LoginCtrl',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'modules/account/scripts/controllers/login.js'
					]);
				}]
			}        	
      	})
      	.state('account.signup', {
        	url: '/signup',
        	templateUrl: 'modules/account/views/signup.html',
        	controller: 'SignupCtrl',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'modules/account/scripts/controllers/signup.js'
					]);
				}]
			}        	
      	})
      	.state('account.logout', {
        	url: '/logout',
        	template: null,
        	controller: 'LogoutCtrl',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'modules/account/scripts/controllers/logout.js'
					]);
				}]
			}        	
      	})
      	.state('account.profile', {
        	url: '/profile',
        	templateUrl: 'modules/account/views/profile.html',
        	controller: 'ProfileCtrl',
        	resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'modules/account/scripts/controllers/profile.js'
					]);
				}],        		
          		authenticated: function($q, $location, $auth) {
	            	var deferred = $q.defer();
	
	            	if(!$auth.isAuthenticated()) {
	              		$location.path('/login');
	            	}else{
	              		deferred.resolve();
	            	}
	            	return deferred.promise;
          		}
        	}
    	});		
	}
	
	
})();
