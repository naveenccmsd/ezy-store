app.controller('productCtrl', function ($scope, $stateParams,$cordovaImagePicker, ionicMaterialInk,$ionicLoading,ProductService,$state,$ionicModal ) {
    //ionic.material.ink.displayEffect();
    $scope.productList=[];
    $scope.newItem={};
    $scope.newItem.image="img/image_preview.jpeg";
    $ionicLoading.show();
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    ProductService.getListproduct()
            .then(function(snapshot){
              if(snapshot.val()!=null)
              {
                var data=snapshot.val();
                
                 angular.forEach(data,function(item,index){       
                  item['productID']=index;     		
               		$scope.productList.push(item);
                  console.log(item);
              	})
              }
              ionicMaterialInk.displayEffect();
              // ionic.material.ink.displayEffect();
              $ionicLoading.hide();
            });
 	$scope.viewProduct=function(productID)
 	{

 		
 	}
  $scope.updateImage=function()
  {
    console.log("image updated");
    $scope.newItem.image="img/load.gif";

    var options = {
   maximumImagesCount: 10,
   width: 800,
   height: 800,
   quality: 80
  };
  
  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        ProductService.uploadImage(results[i]);
      }
    }, function(error) {
      // error getting photos
    });

    
  }
  $scope.addNewProduct=function()
  {
    $scope.modal.show();
  }
  $scope.createProduct=function()
  {
    $scope.modal.hide();
    $ionicLoading.show();
    console.log($scope.newItem);
    $ionicLoading.hide();
    $scope.newItem={};
  }
});