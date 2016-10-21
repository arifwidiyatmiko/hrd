(function(){
	app.config(config);

  	app.run(function($rootScope, $window, $auth, $localStorage, appConfig) {
  		$rootScope.appConfig = appConfig;
  		
    	if ($auth.isAuthenticated()) {
      		$rootScope.accountProfile = $localStorage.accountProfile;
    	}	
	});
	
	config.$inject = ['$authProvider', '$httpProvider', 'appConfig'];
	function config($authProvider, $httpProvider, appConfig){
		//custom: menghilangkan preflight saat cors
		//$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //ga da preflight tp di nodejs nya kebaca raw string gtu
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/json'; //ada preflight
			
		//by yogie
		$authProvider.baseUrl = '/authentification/api';
		$authProvider.loginUrl = 'http://account.maya.id/auth/usernamepassword';
		$authProvider.tokenPrefix = 'MayaID';
		//
		
		angular.forEach(appConfig.data.providers, function(provider){
		    $authProvider[provider.name]({
		      clientId: provider.clientId
		    });	
		});
		
		/*
	    $authProvider.facebook({
	      clientId: '164390044260'
	    });

	    $authProvider.google({
	      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
	    });
	
	    $authProvider.github({
	      clientId: '45ab07066fb6a805ed74'
	    });
	
	    $authProvider.linkedin({
	      clientId: '77cw786yignpzj'
	    });
	
	    $authProvider.yahoo({
	      clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
	    });
	
	    $authProvider.twitter({
	      url: '/auth/twitter'
	    });
	
	    $authProvider.live({
	      clientId: '000000004C12E68D'
	    });
	
	    $authProvider.oauth2({
	      name: 'foursquare',
	      url: '/auth/foursquare',
	      clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
	      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
	      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    	});
    	*/		
	}
	
	
})();

/*
angular.module('app').config(['$authProvider', '$httpProvider', function($authProvider, $httpProvider) {
	
}]);
*/