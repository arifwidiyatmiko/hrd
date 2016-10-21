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
			}
	]);