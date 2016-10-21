'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular.module('app', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ngStorage',
	'ui.router',
	'ui.utils',
	'mgcrea.ngStrap',
	'pascalprecht.translate',
	'oc.lazyLoad',
	'ui.load',
	'ui.jp',
	'angular-loading-bar',
	'ngMessages',
	'satellizer'
]);


//manual bootstrapping = buat ambil data sebelum angular di mulai
//jgn lupa untuk remove "ng-app"
/*
angular.element(document).ready(function(){
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');
    
    $http.get('config.json').then(function(response){
    	app.constant('appConfig', response.data);
        angular.bootstrap(document, ['app']);
    })
    .catch(function(response) {
    	if(response.status == '404') console.log('catch - response: ', response);
    	angular.bootstrap(document, ['app']);
    });
});
*/

//versi advance bootstrapping https://github.com/philippd/angular-deferred-bootstrap
window.deferredBootstrapper.bootstrap({
  element: window.document.body,
  module: 'app',
  resolve: {
    appConfig: ['$http', function ($http) {
      return $http.get('config.json');
    }],
    /*
    OTHER_CONFIG: ['$http', function ($http) {
      return $http.get('/api/demo-config-2');
    }],
    USING_Q: ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
      var deferred = $q.defer();
      $timeout(function () {
        deferred.resolve('MyConstant');
      }, 2000);
      return deferred.promise;
    }]*/
  }
});