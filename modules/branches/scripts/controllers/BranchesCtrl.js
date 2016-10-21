(function () {
	
	'use strict';
 
	angular.module('app').controller('BranchesCtrl', controller);
 
    controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', 'actionServices'];
	function controller($http, $scope, $alert, $state, $stateParams, $location, actionServices){
        $scope.model = 'branches';
        
        $scope.view = {
            list: function(){
                $scope.pageTitle = 'Branches Lists';
                $scope.viewUrl = '#/app/' + $scope.model + '/view';
                                
                $scope.dataName = $scope.model + 'records';
                $scope.loading = {};
    	        $scope.loadingdata = true;
	  	
			  	$scope.rowCollectionBasic = [
			      {id: 1, firstName: 'Yogie Pribadi', lastName: 'Mulya', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1981-01-18'), phone1: '0817-74-8484', email1: 'yogie@aksimaya.co.id'},
			      {id: 2, firstName: 'Heddi', lastName: 'Heryadi', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1979-09-13'), phone1: '0838-1923-6995', email1: 'heddi@aksimaya.co.id'},
			      {id: 3, firstName: 'Christina', lastName: 'Nurmanita', gender: 0, genderLONG: 'Perempuan', birthDate: new Date('1983-01-21'), phone1: '0815-1304-6277', email1: 'nita@aksimaya.co.id'},
			      {id: 4, firstName: 'Rizki Prasetya', lastName: 'Nugraha', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1979-12-27'), phone1: '0812-9421-2015', email1: 'rizki@aksimaya.co.id'},
			      {id: 5, firstName: 'Rismanto Yoga', lastName: 'Bandotno', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1978-03-22'), phone1: '0812-112-2378', email1: 'yoga@aksimaya.co.id'},
			      {id: 6, firstName: 'Antonius', lastName: 'Simamora', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1981-12-24'), phone1: '0815-7431-4082', email1: 'anton@aksimaya.co.id'} 
			  	];                
            },
            add: function(){
                $scope.pageTitle = 'Add New Employee';

                $scope.saveBtnTxt = 'Save';
                $scope.cancelBtnTxt = 'Cancel';
                $scope.cancelBtnHref = '#/' + $scope.model + '/list';
                                
                $scope.dataName = $scope.model;
                $scope.data[$scope.dataName] = {};

                //----- START: get data & init default select Static Option / enums -----//
                $scope.data[$scope.dataName].group = 'Auditor';                    
                $scope.data[$scope.dataName].status = 'Active';
                //----- END: get data & init default select Static Option / enums -----//
                
                $scope.initFormAdd();
                
            },
            view: function(id){
            	$scope.pageTitle = 'View Employee Data';
                
                $scope.editBtnTxt = 'Edit';
                $scope.deleteBtnTxt = 'Delete';
                $scope.cancelBtnTxt = 'Cancel';
                $scope.cancelBtnHref = '#/' + $scope.model + '/list';
                
                $scope.mode = 'view';
                $scope.itemId = id;
                
                //$scope.findOneAndInitForm(id, {});                
            },
            edit: function(id){
                $scope.pageTitle = 'Edit Employee Data';
                
                $scope.updateBtnTxt = 'Update';
                $scope.cancelBtnTxt = 'Cancel';
                $scope.cancelBtnHref = '#/' + $scope.model + '/list';
                
                $scope.mode = 'edit';
                $scope.itemId = id;
                
                $scope.findOneAndInitForm(id, {});
            }
        };

         var _parentAction = _.merge($scope, actionServices);
         
         $scope = _.merge(_parentAction, {
            
            /*
            createOrUpdate: function(){
                console.log('override');    
            }*/
            
         });

        $scope.execView($state, $stateParams);                
    }    
})();