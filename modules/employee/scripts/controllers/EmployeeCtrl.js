(function () {
	
	'use strict';
 
	angular.module('app').controller('EmployeeCtrl', controller);
 
	controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', 'actionServices'];
	
	function controller($http, $scope, $alert, $state, $stateParams, $location, actionServices) {
		console.log('EmployeeCtrl Loaded');
		//Model
		$scope.model = 'employee';
		//List Fungsi
		$scope.addOnClick = addOnClick;
		$scope.updateOnClick = updateOnClick;
		$scope.DeleteOnClick = DeleteOnClick;
		$scope.religion ={};
		$scope.marital ={};
		$scope.workStatus ={};
		$scope.province = {};
		$scope.departement = {};
		$scope.idJob = {};
		//Load Data
		$scope.Religions = [{"id": 1, "name": "Islam"},
									{"id": 2, "name": "Katholik"},
									{"id": 3, "name": "Protestan"},
									{"id": 4, "name": "Hindu"},
									{"id": 5, "name": "Buddha"}];
		$scope.Marital = [{"name":"Maried"},{"name":"single"}];
		$scope.WorkStatus = [{"name":"Tetap"},{"name":"Kontrak"},{"name":"Resign"}];
		$scope.Province = [{"name":"Aceh"},{"name":"Sumatra Utara"},{"name":"Sumatra Barat"},
							{"name":"Riau"},{"name":"Jambi"},{"name":"Kepulauan Riau"},
							{"name":"Bangka Belitung"},{"name":"Bengkulu"},{"name":"Lampung"},
							{"name":"DKI Jakarta"},{"name":"Banten"},{"name":"Jawa Barat"},
							{"name":"Jawa Tengah"},{"name":"Jawa Timur"},{"name":"Daerah Istimewa Yogyakarta"},
							{"name":"Bali"},{"name":"Nusa Tenggara Barat"},{"name":"Nusa Tenggara Barat"},
							{"name":"Kalimantan Barat"},{"name":"Kalimantan Tengah"},{"name":"Kalimantan Selatan"},{"name":"Kalimantan Timur"},
							{"name":"Kalimantan Utara"},{"name":"Sulawesi"}];
		$http.get('/api/departement/').then(function(response) {
                    //console.log('response', response.data.data);
                    $scope.Departement = response.data.data;
                });
		$http.get('/api/jobtitle/').then(function(response) {
                    //console.log('response', response.data.data);
                    $scope.JobTitle = response.data.data;
                });
		function findDepartement() {
			return $http.get('/api/departement/').then(function(response) {
                    //console.log('response', response.data.data);
                    $scope.Departement = response.data.data;
                });
		}
		function findJobtitle() {
			return $http.get('/api/jobtitle/').then(function(response) {
                    //console.log('response', response.data.data);
                    $scope.JobTitle = response.data.data;
                });
		}
		function addOnClick() {
			//var data = {};
			var data = {
				employeeNumber:$scope.employeeNumber,
				idEmployee:$scope.idEmployee,
				firstName:$scope.firstName,
				lastName:$scope.lastName,
				gender:$scope.gender,
				birthDate:$scope.birthDate,
				birthPlace:$scope.birthPlace,
				religion:$scope.religion.selected,
				marital:$scope.marital.selected,
				citizenship:$scope.citizenship,
				personalEmail:$scope.personalEmail,
				companyEmail:$scope.companyEmail,
				telephoneNumber:$scope.telephoneNumber,
				mobileNumber:$scope.mobileNumber,
				workStatus:$scope.workStatus.selected,
				motherName:$scope.motherName,
				accountNumber:$scope.accountNumber,
				province:$scope.province.selected,
				city:$scope.city,
				streetName:$scope.streetName,
				zipcode:$scope.zipcode,
				idJob:$scope.idJob.selected,
				idDepartement:$scope.departement.selected,
				assignDate:$scope.assignDate,
				assignStart:$scope.assignStart,
				assignFinish:$scope.assignFinish,
				resignDate:$scope.resignDate,
				detail:$scope.detail
			}
			console.log('coba data:',data);
			
			$http.post('/api/' + $scope.model + '/?' , data).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                        if(done) return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        if(done) return done('error');
    	            }
    	        });
			refresh();
			$location.path("/app/employee/list");
			
		}
		function updateOnClick() {
			var data = {};
			var coba = $scope.data;
			console.log('coba data:',coba);
			console.log('url :','/api/' + $scope.model + '/idEmployee?'+ $scope.data.idEmployee);
			
			$http.post('/api/' + $scope.model + '/?idEmployee='+$scope.data.idEmployee , coba).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                        if(done) return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        if(done) return done('error');
    	            }
    	            refresh();
    	        });
			$location.path("/app/employee/list"); 
			
			//$scope.create($scope.model,data);
		}
		function DeleteOnClick(id){
			var model = $scope.model;
			console.log('alamat :','/api/' + $scope.model + '?idEmployee='+id);
			//actionServices.delete(model,id);
			if (confirm('Are you sure you want to delete this?')) {
				$http.delete('/api/' + $scope.model + '?idEmployee='+id).then(function(response){
    	            console.log('Delete response', response);
                    $scope.data = response.data.data;
    	        });
				refresh();
				$location.path("/app/employee/list");
    		}
    		
			
		}
		function refresh(){
			return $http.get('/api/' + $scope.model + '/').then(function(response) {
                    console.log('response', response.data.data);
                    $scope.data = response.data.data;
                });
		}
		$scope.view = {
			list: function(){
				console.log('workStatus',$scope.WorkStatus);
				$scope.pageTitle = 'Employees List';
				$scope.detailUrl = '#/' + $scope.model + '/edit';
				$scope.viewUrl = '#/app/' + $scope.model + '/view';
                findDepartement();
				findJobtitle();

				$scope.dataName = $scope.model + 'records';
				$scope.loading = {};
				$scope.loadingdata = true;
	  			$scope.rowCollections = [
			      {id: 1, firstName: 'Yogie Pribadi', lastName: 'Mulya', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1981-01-18'), phone1: '0817-74-8484', email1: 'yogie@aksimaya.co.id'},
			      {id: 2, firstName: 'Heddi', lastName: 'Heryadi', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1979-09-13'), phone1: '0838-1923-6995', email1: 'heddi@aksimaya.co.id'},
			      {id: 3, firstName: 'Christina', lastName: 'Nurmanita', gender: 0, genderLONG: 'Perempuan', birthDate: new Date('1983-01-21'), phone1: '0815-1304-6277', email1: 'nita@aksimaya.co.id'},
			      {id: 4, firstName: 'Rizki Prasetya', lastName: 'Nugraha', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1979-12-27'), phone1: '0812-9421-2015', email1: 'rizki@aksimaya.co.id'},
			      {id: 5, firstName: 'Rismanto Yoga', lastName: 'Bandotno', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1978-03-22'), phone1: '0812-112-2378', email1: 'yoga@aksimaya.co.id'},
			      {id: 6, firstName: 'Antonius', lastName: 'Simamora', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1981-12-24'), phone1: '0815-7431-4082', email1: 'anton@aksimaya.co.id'} 
			  	];      
			  	//data = $scope.rowCollections; 
			  	
			  	return $http.get('/api/' + $scope.model + '/').then(function(response) {
                    console.log('response', response.data.data);
                    $scope.data = response.data.data;
                });
			  	console.log('list d:',$scope.data);
			  	//console.log('list r:',$scope.rowCollections);         
			},
			add: function(){
				findDepartement();
				findJobtitle();
				$scope.pageTitle = 'Add New Employee';
				console.log('workStatus',$scope.WorkStatus);
				$scope.saveBtnTxt = 'Save';
				$scope.cancelBtnTxt = 'Cancel';
				$scope.cancelBtnHref = '#/' + $scope.model + '/list';
				//$scope.assignDate = {};
				$scope.dataName = $scope.model;
				$scope.data[$scope.dataName] = {};
				//----- START: get data & init default select Static Option / enums -----//
				$scope.data[$scope.dataName].group = 'Auditor';                    
				$scope.data[$scope.dataName].status = 'Active';
				//----- END: get data & init default select Static Option / enums -----//
                
				$scope.initFormAdd();
			},
			view: function(id){
				findDepartement();
				findJobtitle();
				$scope.pageTitle = 'View Employee Data';
				
				$scope.editBtnTxt = 'Edit';
				$scope.deleteBtnTxt = 'Delete';
				$scope.cancelBtnTxt = 'Cancel';
				$scope.cancelBtnHref = '#/' + $scope.model + '/list';
				
				$scope.mode = 'view';
				$scope.itemId = id;
				console.log(id);
				//
				$http.get('/api/' + $scope.model + '?idEmployee='+id).then(function(response){
    	            console.log('View response', response.data.data[0]);
                    $scope.data = response.data.data[0];
    	        });
				//$scope.findOneAndInitForm(id, {});             
			},
			edit: function(id){
				$scope.pageTitle = 'Edit Employee Data';
				findDepartement();
				findJobtitle();
				$scope.updateBtnTxt = 'Update';
				$scope.cancelBtnTxt = 'Cancel';
				$scope.cancelBtnHref = '#/' + $scope.model + '/list';
				
				$scope.mode = 'edit';
				$scope.itemId = id;
				$http.get('/api/' + $scope.model + '?idEmployee='+id).then(function(response){
    	            console.log('Edit response', response.data.data[0]);
                    $scope.data = response.data.data[0];
                    $scope.data.religion = {id: null, name: response.data.data[0].religion};
                    $scope.data.marital = {name: response.data.data[0].marital};
                    $scope.data.province = {name: response.data.data[0].province};
                    $scope.data.workStatus = {name: response.data.data[0].workStatus};
                    $scope.data.departement = {idDepartement:response.data.data[0].idDepartement ,departementName: response.data.data[0].departementName};
                    $scope.data.idJob = {jobId:response.data.data[0].idJob,jobTitle: response.data.data[0].jobTitle};
                    //$scope.data.idJob = {jobId: response.data.data[0].idJob,jobTitle: $scope.Departement.};
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