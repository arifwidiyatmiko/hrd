(function () {
	
	'use strict';
 
	angular.module('app').controller('allowanceCtrl', controller);
 
	controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', 'actionServices'];
	
	function controller($http, $scope, $alert, $state, $stateParams, $location, actionServices) {
		console.log('allowanceCtrl Loaded');
		
		$scope.modelBonus = 'Bonus';
		$scope.modelLembur = 'Lembur';
		$scope.model = 'allowance';
		$scope.viewTabLembur = viewTabLembur;
		$scope.viewTabBonus = viewTabBonus;

		$scope.addOnClick = addOnClick;
		$scope.updateOnClick = updateOnClick;
		$scope.DeleteOnClick = DeleteOnClick;
		$scope.tabView = {};
		$scope.employee = {};

		function findEmployee() {
			// body...
			return $http.get('/api/employee/').then(function(response) {
                    console.log('response', response.data.data);
                    $scope.Employee = response.data.data;
                });
		}

		function viewTabLembur() {
			// body...\
			console.log('Lembur Tab loaded');
			$scope.tabView.active = 'Lembur';
			//$scope.detailUrl = '#/app/lembur/edit';
		}
		function viewTabBonus() {
			// body...\
			console.log('Bonus Tab loaded');
			$scope.tabView.active = 'Bonus';
			//$scope.detailUrl = '#/app/bonus/edit';
		}
		function loadBonus() {
			// body...
			console.log('refresh :','/api/' + $scope.modelBonus + '/');
			return $http.get('/api/' + $scope.modelBonus + '/').then(function(response) {
                    console.log('response bonus', response.data.data);
                    $scope.Bonus = response.data.data;
                });
		}
		function loadLembur() {
			// body...
			console.log('refresh :','/api/' + $scope.modelLembur + '/');
			return $http.get('/api/' + $scope.modelLembur + '/').then(function(response) {
                    console.log('response lembur', response.data.data);
                    $scope.Lembur = response.data.data;
                });
		}

		function addOnClick() {
			//var data = {};
			var data = {
				allowanceType:$scope.allowanceType,
				idLembur:$scope.idLembur,
				idBonus:$scope.idBonus,
				date:$scope.date,
				hour:$scope.hour,
				amount:$scope.amount,
				note:$scope.note,
				idEmployee:$scope.employee.selected
			}
			$scope.model = $scope.allowanceType; 
			console.log('coba data:',data);
			console.log('URL post : ','/api/' + $scope.model + '/?');
			
			$http.post('/api/' + $scope.model + '/?' , data).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                        //return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        //return done('error');
    	            }
    	        });
			refresh();
			$location.path('app/allowance/list');
			
			//$scope.create($scope.model,data);
		}

		function updateOnClick() {
			var data = {};
			var coba = $scope.data;
			$scope.model = $scope.allowanceType; 
			console.log('coba data:',coba);
			$scope.stateParams = $stateParams;
			console.log('param',$stateParams);
			console.log('id',$scope.data.idLembur);
			//console.log('url :','/api/' + $scope.model + '/idDepartement?'+ $scope.data.idDepartment);
			
			if ($stateParams.allowanceType == 'Lembur') {
				console.log('/api/' + $stateParams.allowanceType + '/?idLembur='+$scope.data.idLembur);
				$http.post('/api/' + $stateParams.allowanceType + '/?idLembur='+$scope.data.idLembur , coba).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                       return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        return done('error');
    	            }
    	            refresh();
    	        });
			}else{
				console.log('/api/' + $stateParams.allowanceType + '/?idBonus='+$scope.data.idBonus);
				
				$http.post('/api/' + $stateParams.allowanceType + '/?idBonus='+$scope.data.idBonus , coba).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                       return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        return done('error');
    	            }
    	            refresh();
    	        });
			}
			
			$location.path('app/allowance/list'); 
			
			//$scope.create($scope.model,data);
		}
		function DeleteOnClick(model,id){
			//var model = $scope.model;
			console.log('alamat :','/api/' + model + '?idDepartement='+id);
			if (model == 'Lembur') {
				if (confirm('Are you sure you want to delete this?')) {
					$http.delete('/api/' + model + '?idLembur='+id).then(function(response){
	    	            console.log('Delete response', response);
	                    $scope.data = response.data.data;
	                    refresh();
	    	        });
				}
			}
			else{
				if (confirm('Are you sure you want to delete this?')) {
					$http.delete('/api/' + model + '?idBonus='+id).then(function(response){
	    	            console.log('Delete response', response);
	                    $scope.data = response.data.data;
	                    refresh();
	    	        });
					
	    		}
    		}
    		$location.path('app/allowance/list');
			
		}
		function refresh(){
			loadBonus();
			loadLembur();
		}
		$scope.view = {
			list: function(){
				viewTabLembur();
				$scope.pageTitle = 'Allowance  List';
				$scope.detailUrl = '#/app/' + $scope.model + '/edit';
				$scope.viewUrl = '#/app/' + $scope.model + '/view';
				$scope.dataName = $scope.model + 'records';
				$scope.loading = {};
				$scope.loadingdata = true;
				refresh();
			  	console.log('list d:',$scope.data);
			  	//console.log('list r:',$scope.rowCollections);         
			},
			add: function(){
				$scope.pageTitle = 'Insert Allowance Data';
				findEmployee();
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
				$scope.pageTitle = 'Edit Allowance Data';
				$scope.updateBtnTxt = 'Update';
				$scope.cancelBtnTxt = 'Cancel';
				$scope.cancelBtnHref = '#/' + $scope.model + '/list';
				findEmployee();
				$scope.mode = 'edit';
				$scope.itemId = id;
				$scope.stateParams = $stateParams;
				console.log('param',$stateParams);
				//console.log('nih ',$scope.tabView);
				if($scope.stateParams.allowanceType == 'Lembur'){
					$http.get('/api/' + $scope.modelLembur + '?idLembur='+id).then(function(response){
	    	            console.log('Edit response', response.data.data[0]);
	                    $scope.data = response.data.data[0];
	                     $scope.data.employee = {idEmployee:response.data.data[0].idEmployee, firstName: response.data.data[0].firstName, lastName: response.data.data[0].lastName};
	                   	$scope.data.allowanceType = 'Lembur';
	                   // viewTabLembur();
	                    console.log('employee selected',$scope.employee);
	                   	//console.log('religion',$scope.data.religion);
	    	        });
				}else{
					$http.get('/api/' + $scope.modelBonus + '?idBonus='+id).then(function(response){
	    	            console.log('Edit response', response.data.data[0]);
	                    $scope.data = response.data.data[0];
	                    $scope.data.employee = {idEmployee:response.data.data[0].idEmployee, firstName: response.data.data[0].firstName, lastName: response.data.data[0].lastName};
	                   	$scope.data.allowanceType = 'Bonus';
	                   	//viewTabBonus();
	                   	//$scope.data.allowanceType = 'asd';
	                    console.log('employee selected',$scope.employee);
	                   	//console.log('religion',$scope.data.religion);
    	        });
				}

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