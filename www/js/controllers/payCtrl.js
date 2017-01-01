app.controller('payCtrl', function ($scope, $stateParams,billListsService,$state,$ionicLoading,$ionicScrollDelegate,$ionicPopup,ionicMaterialInk,$timeout, ionicMaterialMotion) {

    $scope.billingID=$stateParams.billingID;
    $scope.redirect=function ()
    {
        $ionicLoading.show();
        $scope.transactionID=billListsService.updatePayment($scope.billingID);
        $timeout(function() {
	       ionicMaterialInk.displayEffect();
	       }, 0);
        $timeout(function(){ 
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: '<font color="green">Payment Successfull <i class="icon ion-checkmark-round"></i><font>',
                    template: 'Thank you for choosing us !!',
                    okText: 'View Bill'
                    });
                alertPopup.then(function(res) {
                $scope.completeTransaction();
                  });
             },3000);
        
        
    }
    $scope.completeTransaction=function()
    {
    	$state.go("app.checkoutitemPay",{billingID : $scope.billingID,transactionID : $scope.transactionID });
    }
});