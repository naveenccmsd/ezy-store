app.controller('AppCtrl', function ($scope,$state, $ionicModal, $ionicPopover, $timeout,$localStorage,$rootScope,$ionicViewService) {
    // Form data for the login modal
    $scope.rand=function()
    {
        return Math.floor((Math.random() * 100) + 1);
    }
    $rootScope.sillyQA = function(q) {
        $ionicViewService.nextViewOptions({
        disableBack: true
        });
        if(q=='app.billLists' || q=='app.billHistory')
        {
            $state.go(q, {newID : $scope.rand()},{ reload: true });
        }
        else
        {
            $state.go(q);
        }
    }
    $scope.reloadRoute = function() {
    $route.reload();
    }

    $scope.loginData = {};
    if($localStorage.displayName!=null)
    {
    $scope.Dname=$localStorage.displayName;
    }
    else
    {
    $scope.Dname=$localStorage.email;
    }
    if($localStorage.photoURL!=null)
    {
    $scope.photoURL=$localStorage.photoURL;
    }
    else
    {
    $scope.photoURL="img/logo.png";
    }
    
    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function () {
    //         this.classList.toggle('active');
    //     });
    // }

    // var template = '<ion-popover-view>' +
    //                 '   <ion-header-bar>' +
    //                 '       <h1 class="title">My Popover Title</h1>' +
    //                 '   </ion-header-bar>' +
    //                 '   <ion-content class="padding">' +
    //                 '       My Popover Contents' +
    //                 '   </ion-content>' +
    //                 '</ion-popover-view>';
    var template = '<ion-popover-view style="width: 151px;height: 20px; cursor:pointer;"><ion-header-bar ng-click="logout_app()"> <h1 class="title"><i class="icon ion-log-out"></i> Logout</h1> </ion-header-bar></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
        $scope.logout_app=function()
        {
            firebase.auth().signOut();
            $localStorage.$reset();
            $scope.closePopover();
            $state.go("login");
        };
});