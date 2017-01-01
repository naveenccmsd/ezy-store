app.controller('billListsCtrl', function ($scope,$rootScope,$state,$http,$stateParams, ionicMaterialMotion,billListsService, $ionicScrollDelegate,billListsService,$ionicLoading,$cordovaBarcodeScanner) {


  if($stateParams.newID==1)
  {
  $scope.defaultcount=1;
  $scope.products = [];
  $scope.totalcost=0;
  $scope.totalcount=0; 
  $stateParams.newID=0;
  } 
  else
  {
    $scope.defaultcount=1;
    $scope.products = [];
    $scope.totalcost=0;
    $scope.totalcount=0; 
    $stateParams.newID=0;
  }
  $scope.openbarcode_scanner=function (){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        if(barcodeData.text!="" && barcodeData.text!=" ")
        {
        $scope.openbarcode_scanner1(barcodeData.text);
        }
        console.log(barcodeData);
      }, function(error) {
        // An error occurred
      });
  }
  

   $scope.openbarcode_scanner1=function (productID){
   	$ionicLoading.show();
      console.log(productID);
      billListsService.getProductById(productID)
            .then(function(snapshot){
              if(snapshot.val()!=null)
              {
              var data=snapshot.val();
              data["productID"]='productID';
              data["count"]=$scope.defaultcount;
              data["itemTprice"]=$scope.defaultcount * data.price;
              console.log(data);
              $scope.products.push(data);
              $scope.totalcount++;
              $scope.totalcost+=data.price;
              $scope.updateProductTotals();
              }
              $ionicScrollDelegate.scrollBottom();
              $ionicLoading.hide();
            });
     
        }
$scope.updateProductTotals=function(){
    $scope.totalcost=0;
    $scope.totalcount=0;
    angular.forEach($scope.products,function(item,index){
    	$scope.totalcount+=item.count;
        $scope.totalcost+=item.itemTprice;
      })
   }
  $scope.updateProductData=function(item,action){
   if(action=='-'){item.count=$scope.minus(item.count) ;}
     if(action=='+'){item.count+=1;}
     item.itemTprice=item.count * item.price;
     $scope.updateProductTotals();
  }
   $scope.checkout_product=function(){
   $rootScope.billItem=[];
   angular.forEach($scope.products,function(item,index){
      	if(item.count>0)
        {
          $rootScope.billItem.push(item);
        }
      });
   $scope.products=$rootScope.billItem;
   $scope.BillingID=billListsService.checkoutProducts($scope.products,$scope.totalcost,$scope.totalcount);
   if($scope.totalcount>0)
   {
      $state.go("app.checkoutitem",{billingID : $scope.BillingID });
    }
    else
    {
      //Add Toast (please add alteast one product)
    }
  }
 $scope.minus = function(a) {
            if (a != 0) {
                a = a - 1;
                return a;
            } else {
                return 0;
            }
        }

 var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
        }, 500);
    };

    $scope.blinds();
});