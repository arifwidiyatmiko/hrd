(function () {
    'use strict';
 
    angular.module('app').controller('StaffCtrl', controller);
 
    controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', 'actionServices'];
    function controller($http, $scope, $alert, $state, $stateParams, $location, actionServices){
        $scope.model = 'staff';
        
        $scope.view = {
            list: function(){
                $scope.pageTitle = 'Data Staff';
                $scope.detailUrl = '#/' + $scope.model + '/edit';
                $scope.editUrl = '#/' + $scope.model + '/edit';
                                
                $scope.dataName = $scope.model + 'records';
                $scope.loading = {};
    	        $scope.loadingdata = true;
                
    	        $scope.reqQueryParams[$scope.model] = {
    	            collect: [].join(','),
    	            where: (!_.isEmpty($scope.where[$scope.model])) ? JSON.stringify($scope.where[$scope.model]) : {},
    	            sort: ($scope.sortBy[$scope.model] || 'createdAt') + ' ' + ($scope.sortOrder[$scope.model] || 'desc'),
    	            skip: $scope.skip[$scope.model] || 0,
    	            limit: $scope.limit[$scope.model] || 25
    	        };                
                
                $scope.listAndInitPaging($scope.reqQueryParams[$scope.model]);
            },
            add: function(){
                $scope.pageTitle = 'Tambah Data Staff';

                $scope.saveBtnTxt = 'Simpan';
                $scope.cancelBtnTxt = 'Batal';
                $scope.cancelBtnHref = '#/' + $scope.model + '/list';
                                
                $scope.dataName = $scope.model;
                $scope.data[$scope.dataName] = {};

                //----- START: get data & init default select Static Option / enums -----//
                $scope.data[$scope.dataName].group = 'Auditor';                    
                $scope.data[$scope.dataName].status = 'Active';
                //----- END: get data & init default select Static Option / enums -----//
                
                $scope.initFormAdd();
                
            },
            edit: function(id){
                $scope.pageTitle = 'Edit Data Staff';
                
                $scope.saveBtnTxt = 'Simpan';
                $scope.cancelBtnTxt = 'Kembali';
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