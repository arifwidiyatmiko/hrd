(function(){
	app.controller('home', controller);
	controller.$inject = ['$scope'];

	function controller($scope){
		$scope.pageTitle = 'Home';
		
	  $scope.rowCollectionBasic = [
	      {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
	      {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
	      {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
	  ];
	
	  $scope.removeRow = function(row) {
	      var index = $scope.rowCollectionBasic.indexOf(row);
	      if (index !== -1) {
	          $scope.rowCollectionBasic.splice(index, 1);
	      }
	  };
	
	  $scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
	  $scope.selectedPredicate = $scope.predicates[0];
	
	  var placenames = ['Soto Bang Meinar', 'Syariah Resto', 'Sate Kambing Ajib', 'Sop Duren', 'Restaurant Namanya Panjang Banget'];
	  var images = ['a0.jpg', 'a1.jpg', 'a2.jpg', 'a3.jpg', 'a4.jpg', 'a5.jpg', 'a6.jpg'];
	  var addresses = ['Jl. Bogor Raya 1 No. 31', 'Jl. Kampus Pakuan 3 No. 51', 'Jl. Tajur Halang No. 51'];
      var isCertificates = ['1', '0'];
      var likes = ['0', '5', '25', '7k'];
      var likeBtns = ['btn-default', 'btn-default', 'btn-default', 'btn-info'];
      var comments = ['0', '5', '2k', '7'];
	  var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
	  var id = 1;
	
	  function generateRandomItem(id) {
	
	      var placename = placenames[Math.floor(Math.random() * 5)];
	      var image = images[Math.floor(Math.random() * 7)];
	      var address = addresses[Math.floor(Math.random() * 3)];
          var isCertificate = isCertificates[Math.floor(Math.random() * 2)];
          var like = likes[Math.floor(Math.random() * 4)];
          var likeBtn = likeBtns[Math.floor(Math.random() * 4)];
          var comment = comments[Math.floor(Math.random() * 4)];
	      var birthdate = dates[Math.floor(Math.random() * 3)];
	      var balance = Math.floor(Math.random() * 2000);
	
	      return {
	          id: id,
	          placeName: placename,
	          image: image,
              address: address,
              isCertificate: isCertificate,
	          like: like,
              likeBtn: likeBtn,
              comment: comment,
	          birthDate: new Date(birthdate),
	          balance: balance
	      }
	  }
	
	  $scope.rowCollection = [];
	
	  for (id; id < 20; id++) {
	      $scope.rowCollection.push(generateRandomItem(id));
	  }
	
	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	
	  //add to the real data holder
	  $scope.addRandomItem = function addRandomItem() {
	      $scope.rowCollection.push(generateRandomItem(id));
	      id++;
	  };
	
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