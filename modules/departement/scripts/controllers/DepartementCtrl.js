(function () {
	
	'use strict';
 
	angular.module('app').controller('DepartementCtrl', controller);
 
	controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', 'actionServices'];
	
	function controller($http, $scope, $alert, $state, $stateParams, $location, actionServices) {
		console.log('DepartementCtrl Loaded');
		
		$scope.model = 'departement';
		$scope.addOnClick = addOnClick;
		$scope.updateOnClick = updateOnClick;
		$scope.DeleteOnClick = DeleteOnClick;

		function addOnClick() {
			//var data = {};
			var data = {
				idDepartment:$scope.idDepartment,
				departementName:$scope.departementName,
				description:$scope.description,
				regularHour:$scope.regularHour
			}
			console.log('coba data:',data);
			//console.log('URL post : ','/api/' + $scope.model + '/?');
			
			$http.post('/api/' + $scope.model + '/?' , data).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                        return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        return done('error');
    	            }
    	        });
			refresh();
			$location.path('app/departement/list');
			
			//$scope.create($scope.model,data);
		}
		function execCreate(data) {
			// body...
			console.log('execCreate loaded');
			console.log('execCreate - data: ', data);
			/*$http.post('/api/' + $scope.model + '/?' , data).then(function(response){
				//vm.modalFormTitle = 'Edit';
				$scope.dataEmployee = response.data;
				alert('successfully created');
				refresh();
			}).error(function(response){
				console.log('error - response: ', response);
				alert(response.message);
			});*/
		}
		function updateOnClick() {
			var data = {};
			var coba = $scope.data;
			console.log('coba data:',coba);
			console.log('url :','/api/' + $scope.model + '/idDepartement?'+ $scope.data.idDepartment);
			
			$http.post('/api/' + $scope.model + '/?idDepartement='+$scope.data.idDepartment , coba).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                       return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        return done('error');
    	            }
    	            refresh();
    	        });
			$location.path('app/departement/list'); 
			
			//$scope.create($scope.model,data);
		}
		function DeleteOnClick(id){
			var model = $scope.model;
			console.log('alamat :','/api/' + $scope.model + '?idDepartement='+id);
			//actionServices.delete(model,id);
			if (confirm('Are you sure you want to delete this?')) {
				$http.delete('/api/' + $scope.model + '?idDepartement='+id).then(function(response){
    	            console.log('Delete response', response);
                    $scope.data = response.data.data;
                    refresh();
    	        });
				
    		}
    		$location.path('app/departement/list');
			
		}
		function refresh(){
			console.log('refresh :','/api/' + $scope.model + '/');
			return $http.get('/api/' + $scope.model + '/').then(function(response) {
                    console.log('response', response.data.data);
                    $scope.data = response.data.data;
                });
		}
		$scope.view = {
			list: function(){
				$scope.pageTitle = 'Departement  List';
				$scope.detailUrl = '#/app/' + $scope.model + '/edit';
				$scope.viewUrl = '#/app/' + $scope.model + '/view';
                                
				$scope.dataName = $scope.model + 'records';
				$scope.loading = {};
				$scope.loadingdata = true;

			  	return $http.get('/api/' + $scope.model + '/').then(function(response) {
                    console.log('response', response.data.data);
                    $scope.data = response.data.data;
                });
			  	console.log('list d:',$scope.data);
			  	//console.log('list r:',$scope.rowCollections);         
			},
			add: function(){
				$scope.pageTitle = 'Add New Departement';
				
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
				console.log(id);
				//
				$http.get('/api/' + $scope.model + '?idDepartement='+id).then(function(response){
    	            console.log('View response', response.data.data[0]);
                    $scope.data = response.data.data[0];
    	        });
				//$scope.findOneAndInitForm(id, {});             
			},
			edit: function(id){
				$scope.pageTitle = 'Edit Departement Data';
				
				$scope.updateBtnTxt = 'Update';
				$scope.cancelBtnTxt = 'Cancel';
				$scope.cancelBtnHref = '#/' + $scope.model + '/list';
				
				$scope.mode = 'edit';
				$scope.itemId = id;
				$http.get('/api/' + $scope.model + '?idDepartement='+id).then(function(response){
    	            console.log('Edit response', response.data.data[0]);
                    $scope.data = response.data.data[0];
                   	//console.log('religion',$scope.data.religion);
    	        });
				//$scope.findOneAndInitForm(id, {});
				//console.log($scope);
			}
		};

		var submit = submit;
		function submit() {
			// body...
		}

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