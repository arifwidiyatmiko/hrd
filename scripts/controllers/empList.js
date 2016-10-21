(function(){
	app.controller('empList', controller);
	controller.$inject = ['$scope'];

	function controller($scope){
		$scope.pageTitle = 'Employee Lists';
		
	  	$scope.rowCollectionBasic = [
	      {id: 1, firstName: 'Yogie Pribadie', lastName: 'Mulya', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1981-01-18'), phone1: '0817-74-8484', email1: 'yogie@aksimaya.co.id'},
	      {id: 2, firstName: 'Heddi', lastName: 'Heryadi', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1979-09-13'), phone1: '0838-1923-6995', email1: 'heddi@aksimaya.co.id'},
	      {id: 3, firstName: 'Christina', lastName: 'Nurmanita', gender: 0, genderLONG: 'Perempuan', birthDate: new Date('1983-01-21'), phone1: '0815-1304-6277', email1: 'nita@aksimaya.co.id'},
	      {id: 4, firstName: 'Rizki Prasetya', lastName: 'Nugraha', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1979-12-27'), phone1: '0812-9421-2015', email1: 'rizki@aksimaya.co.id'},
	      {id: 5, firstName: 'Rismanto Yoga', lastName: 'Bandotno', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1978-03-22'), phone1: '0812-112-2378', email1: 'yoga@aksimaya.co.id'},
	      {id: 6, firstName: 'Antonius', lastName: 'Simamora', gender: 1, genderLONG: 'Laki-Laki', birthDate: new Date('1981-12-24'), phone1: '0815-7431-4082', email1: 'anton@aksimaya.co.id'} 
	  	];
	  	
		$scope.removeRow = function(row) {
			var index = $scope.rowCollectionBasic.indexOf(row);
	      if (index !== -1) {
	          $scope.rowCollectionBasic.splice(index, 1);
	      }
	  	};
	  	
		$scope.predicates = ['firstName', 'lastName', 'gender', 'birthDate', 'phone1', 'email1'];
	  	$scope.selectedPredicate = $scope.predicates[0];

  		var firstnames = ['Yogie Pribadi', 'Heddi', 'Christina', 'Rizki Prasetya', 'Rismanto Yoga', 'Antonius'];
  		var lastnames = ['Mulya', 'Heryadi', 'Nurmanita', 'Nugraha', 'Bandotno', 'Simamora'];
  		var dates = ['1981-01-18', '1979-09-13', '1983-01-21', '1979-12-27', '1978-03-22', '1981-12-24'];
  		var id = 1;

  		function generateRandomItem(id) {
	      var firstname = firstnames[Math.floor(Math.random() * 3)];
	      var lastname = lastnames[Math.floor(Math.random() * 3)];
	      var birthdate = dates[Math.floor(Math.random() * 3)];
	      var balance = Math.floor(Math.random() * 2000);

      	return {
         	id: id,
          	firstName: firstname,
          	lastName: lastname,
          	birthDate: new Date(birthdate),
          	balance: balance
      	}
  		}

	  	$scope.rowCollection = [];
	  	for (id; id < 6; id++) {
			$scope.rowCollection.push(generateRandomItem(id));
	  	}

	  	//copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  	$scope.displayedCollection = [].concat($scope.rowCollection);
	  	
	  	//remove to the real data holder
	  	$scope.removeItem = function(row) {
			var index = $scope.rowCollection.indexOf(row);
	      if (index !== -1) {
	          $scope.rowCollection.splice(index, 1);
	      }
	  	}
	  
	  	//  pagination
	  	$scope.itemsByPage=10;
	
	  	$scope.rowCollectionPage = [];
	  	for (var j = 0; j < 200; j++) {
	    	$scope.rowCollectionPage.push(generateRandomItem(j));
	  	}

  		// pip
		var promise = null;
  		$scope.isLoading = false;
  		$scope.rowCollectionPip = [];
  		$scope.getPage = function() {
    		$scope.rowCollectionPip=[];
    		for (var j = 0; j < 20; j++) {
      		$scope.rowCollectionPip.push(generateRandomItem(j));
    		}
  		}
  		
  		$scope.callServer = function getData(tableState) {
      	//here you could create a query string from tableState
      	//fake ajax call
      	$scope.isLoading = true;

      	$timeout(function () {
				$scope.getPage();
          	$scope.isLoading = false;
      	}, 2000);
  		};  		
		
		
		$scope.getPage();
	}
	
})();