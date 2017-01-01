app.controller('checkoutItemCtrl', function ($scope, $stateParams,$state,billListsService,$ionicViewService,$ionicLoading,$ionicScrollDelegate, ionicMaterialMotion) {

    $scope.billingID=$stateParams.billingID;
    $scope.transactionID="";
    $scope.displaypayNow=true;
    $scope.newBill=true;
    console.log($scope.newBill);
     if($stateParams.transactionID!=null)
    {
    $scope.transactionID=$stateParams.transactionID;
    $scope.displaypayNow=false;
    }
    if($stateParams.payID!=null && $stateParams.payID=='1')
    {
        console.log($stateParams.payID);
        $scope.newBill=false;
    }
    console.log($scope.newBill);
    $scope.products = [];
    $ionicLoading.show();
      billListsService.getListProductsByBillID($scope.billingID)
            .then(function(snapshot){
              if(snapshot.val()!=null)
              {
                  $scope.productList = JSON.parse(snapshot.val().product);
                  $scope.totalcost=snapshot.val().totalcost;
                  $scope.totalcount=snapshot.val().totalcount;
                  angular.forEach($scope.productList,function(item,index){
                    console.log(item);
                    $scope.products.push(item);
                  });
              }
              $scope.blinds();
              $ionicScrollDelegate.scrollBottom();
              $ionicLoading.hide();
            });
    $scope.paynow=function(){
        $state.go("app.pay",{billingID : $scope.billingID });
    }
    $scope.new_bill=function()
    {
        $ionicViewService.nextViewOptions({
        disableBack: true
        });
        $scope.rand=Math.floor((Math.random() * 100) + 1);
        $state.go("app.billLists",{newID : $scope.rand});
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