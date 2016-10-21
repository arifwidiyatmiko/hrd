angular.module('app')
  .controller('LogoutCtrl', function($auth, $alert, $localStorage) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout()
      .then(function() {
      	delete $localStorage.accountProfile;
      	
        $alert({
          content: 'You have been logged out',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
  });