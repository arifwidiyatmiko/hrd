'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
	.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider ) {
		$urlRouterProvider.otherwise('/app/home');
		$stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				views: {
					'': {
	                	templateUrl: 'views/layout.html'
	              	},
					'aside': {
						templateUrl: 'views/partials/aside.nav.html'
					}	 	              
				}
			})
			.state('app.home', {
				url: '/home',
				templateUrl: 'views/pages/home.html',
				controller: 'home',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load(['scripts/controllers/home.js']);
					}]
				}
			})

         	/// employee components router
         	.state('app.employee', {
           		url: '/employee',
           		template: '<div ui-view></div>',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'vendor/libs/lodash.js',
							'scripts/services/actionServices.js',
							'modules/employee/scripts/controllers/EmployeeCtrl.js'
						]);
					}]
				}
         	})
				.state('app.employee.list', {
					url: '/list',
					templateUrl: 'modules/employee/views/list.html',
					controller: 'EmployeeCtrl'
				})
				.state('app.employee.view', {
					url: '/view/:itemId',
					templateUrl: 'modules/employee/views/view.html',
					controller: 'EmployeeCtrl'
				})				
				.state('app.employee.add', {
					url: '/add',
					templateUrl: 'modules/employee/views/add.html',
					controller: 'EmployeeCtrl'
				})
				.state('app.employee.edit', {
					url: '/edit/:itemId',
					templateUrl: 'modules/employee/views/edit.html',
					controller: 'EmployeeCtrl'
				})	

			/// Departemen components router
         	.state('app.departement', {
           		url: '/departement',
           		template: '<div ui-view></div>',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'vendor/libs/lodash.js',
							'scripts/services/actionServices.js',
							'modules/departement/scripts/controllers/DepartementCtrl.js'
						]);
					}]
				}
         	})
         		.state('app.departement.list', {
					url: '/list',
					templateUrl: 'modules/departement/views/list.html',
					controller: 'DepartementCtrl'
				})		
				.state('app.departement.add', {
					url: '/add',
					templateUrl: 'modules/departement/views/add.html',
					controller: 'DepartementCtrl'
				})
				.state('app.departement.edit', {
					url: '/edit/:itemId',
					templateUrl: 'modules/departement/views/edit.html',
					controller: 'DepartementCtrl'
				})	
			/// Departemen components router
         	.state('app.jobtitle', {
           		url: '/jobtitle',
           		template: '<div ui-view></div>',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'vendor/libs/lodash.js',
							'scripts/services/actionServices.js',
							'modules/jobtitle/scripts/controllers/jobtitleCtrl.js'
						]);
					}]
				}
         	})
         	.state('app.jobtitle.list', {
					url: '/list',
					templateUrl: 'modules/jobtitle/views/list.html',
					controller: 'jobtitleCtrl'
				})		
				.state('app.jobtitle.add', {
					url: '/add',
					templateUrl: 'modules/jobtitle/views/add.html',
					controller: 'jobtitleCtrl'
				})
				.state('app.jobtitle.edit', {
					url: '/edit/:itemId',
					templateUrl: 'modules/jobtitle/views/edit.html',
					controller: 'jobtitleCtrl'
				})	
			/// Departemen components router
         	.state('app.allowance', {
           		url: '/allowance',
           		template: '<div ui-view></div>',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'vendor/libs/lodash.js',
							'scripts/services/actionServices.js',
							'modules/allowance/scripts/controllers/allowanceCtrl.js'
						]);
					}]
				}
         	})
         	.state('app.allowance.list', {
					url: '/list',
					templateUrl: 'modules/allowance/views/list.html',
					controller: 'allowanceCtrl'
				})		
				.state('app.allowance.add', {
					url: '/add',
					templateUrl: 'modules/allowance/views/add.html',
					controller: 'allowanceCtrl'
				})
				.state('app.allowance.edit', {
					url: '/edit/:itemId/:allowanceType',
					templateUrl: 'modules/allowance/views/edit.html',
					controller: 'allowanceCtrl'
				})	
				
			}

	]);