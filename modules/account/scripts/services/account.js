(function(){
	app.factory('Account', factory);
	factory.$inject = ['$http', '$localStorage'];

	function factory($http, $localStorage){
	    return {

	      getProfile: function(done) {
	      	if($localStorage.accountProfile){
	      		return done(null, $localStorage.accountProfile);
	      	}

	      	$http.get('/authentification/api/me').success(function(data) {
	        	$localStorage.accountProfile = data;
	        	return done(null, data);
	        })
	        .error(function(error) {
	        	return done(error);
	        });
	      },
	      
	      /* aslinya
	      getProfile: function() {
	        return $http.get('/authentification/api/me');
	      },*/
	     
	      updateProfile: function(profileData) {
	        return $http.put('/authentification/api/me', profileData);
	      }
	    };		
	}
})();