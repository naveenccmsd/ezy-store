app.controller('billHistoryCtrl', function ($scope, $stateParams, ionicMaterialInk,$ionicLoading,billListsService,$state ) {
    //ionic.material.ink.displayEffect();
    $scope.BillList=[];
    
    $ionicLoading.show();

    billListsService.getListBillByUser('0')
            .then(function(snapshot){
              if(snapshot.val()!=null)
              {
              var data=snapshot.val();
              console.log(data);
               angular.forEach(data,function(item,index){
               	if(item.transaction)
               	{
               		var trans=item.transaction;
               		if(item.transaction.paymentstaus!=null && (item.transaction.paymentstaus==true || item.transaction.paymentstaus=="true" ))
               		{
               		item["tmp_billID"]=index;
               		 var productList = JSON.parse(item.product);
               		angular.forEach(productList,function(item1,index1){
                   	 item["tmp_img"]=item1.image;
                	  });
               		$scope.BillList.push(item);
               		}
               	}
		    		
		      })
              }
              ionicMaterialInk.displayEffect();
              // ionic.material.ink.displayEffect();
              $ionicLoading.hide();
            });
 	$scope.viewHistory=function(bID,tID)
 	{
 		$state.go("app.checkoutitemPay",{ billingID : bID  , transactionID : tID , payID : '1' });
 		console.log(tID);
 	}
});