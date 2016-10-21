'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')  
	.controller('MainCtrl', ['$scope', '$translate', '$localStorage', '$window', '$auth', 'Account', function ($scope, $translate, $localStorage, $window, $auth, Account) {
		// add 'ie' classes to html
		var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
		isIE && angular.element($window.document.body).addClass('ie');
		isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
		
		//authentification
	    $scope.isAuthenticated = function() {
	      return $auth.isAuthenticated();
	    };
		//authentification
		
      // config
      $scope.app = {
			name: 'HR Management',
			version: '',
        
			//start custom: untuk footer  vendor
			vendorName: 'Aksimaya',
			vendorTag: 'Solusi online dimulai disini!',
			vendorURL: 'http://www.aksimaya.co.id',
			//end custom: untuk footer  vendor
			
			/* ga kepake       
	        // for chart colors
	        color: {
	          primary: '#155abb',
	          info:    '#2772ee',
	          success: '#4bb622',
	          warning: '#f88311',
	          danger:  '#e11144',
	          inverse: '#a66bee',
	          light:   '#f1f2f3',
	          dark:    '#202a3a'
	        },
	        settings: {
	          headerColor: 'bg-primary',
	          headerFixed: true,
	          headerShadow: true,
	          asideColor: 'bg-dark lt',
	          asideTop: true
	        }*/
	      }
		
		/* ga kepake					
	      $scope.options = {
	        headerColor:[
	          'bg-primary lt',
	          'bg-primary ',
	          'bg-primary dk',
	          'bg-info lt',
	          'bg-info',
	          'bg-info dk',
	          'bg-success lt',
	          'bg-success ',
	          'bg-success dk',
	          'bg-inverse lt',
	          'bg-inverse ',
	          'bg-inverse dk',
	          'bg-dark lt',
	          'bg-dark',
	          'bg-dark dk ',
	          'bg-black ',
	          'bg-black dk',
	          'bg-white box-shadow-md'
	        ],
	        asideColor:[
	          'bg-primary dk',
	          'bg-info dk',
	          'bg-success dk',
	          'bg-dark lt',
	          'bg-dark',
	          'bg-dark dk',
	          'bg-black lt',
	          'bg-black',
	          'bg-black dk',
	          'bg-white',
	          'bg-light',
	          'bg-light dk'
	        ]
	      };
	      
	     $scope.setHeaderColor = function(color){
	        $scope.app.settings.headerColor = color;
	     }
	     $scope.setAsideColor = function(color){
	     	$scope.app.settings.asideColor = color;
	     }		

		// save settings to local storage
		if (angular.isDefined($localStorage.appSettings)) {
			$scope.app.settings = $localStorage.appSettings;
		} else {
			$localStorage.appSettings = $scope.app.settings;
		}
		$scope.$watch('app.settings', function() {$localStorage.appSettings = $scope.app.settings;}, true);
		*/
		
		// start custom: force init headerColor
		// start custom: force init headerColor
		$scope.app.settings = {};
		$scope.app.settings.asideColor = 'bg-black dk';
		$scope.app.settings.headerColor = 'bg-primary';
        $scope.app.settings.headerFixed = true;
        $scope.app.settings.asideTop = true;
		// end custom
		// end custom
		
		// angular translate
		$scope.langs = {en:'English', zh_CN:'中文'};
		$scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
		$scope.setLang = function(langKey) {
			// set the current lang
			$scope.selectLang = $scope.langs[langKey];
			// You can change the language during runtime
			$translate.use(langKey);
		};

		function isSmartDevice($window) {
			// Adapted from http://www.detectmobilebrowsers.com
			var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
			// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
			return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
		}
	}]);