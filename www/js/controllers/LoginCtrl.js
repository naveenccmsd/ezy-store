app.controller('LoginCtrl', function ($scope,$state, $localStorage,LoginService,$ionicModal,$ionicLoading, $ionicPopover, $timeout,$ionicPopup) {
    $scope.loginData = {};
    if($localStorage.uid!=null)
    {
      $state.go("app.billLists",{newID : "1"});
    }
    $scope.$on("$destroy", function(){
       console.log("leaving controller");
    });
    $scope.doLogin = function() {
        
      var validates= LoginService.validateUser($scope.loginData.email, $scope.loginData.password);
      if(validates>=0)
      {
        $ionicLoading.show();
       LoginService.loginUser($scope.loginData.email, $scope.loginData.password).catch(function(error) {
                $ionicLoading.hide();
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/wrong-password') {
                  alert('Wrong password');
                } else {
                  console.error(error);
                }
              });
      }
    }
     $scope.doGoogleLogin = function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log("logged in google :"+ token +" -- "+user);
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log("logged in google :"+ errorCode +" -- "+errorMessage);
          // ...
        });
     }
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $localStorage.uid=user.uid;
          $localStorage.photoURL=user.photoURL;
          $localStorage.email=user.email;
          $localStorage.displayName=user.displayName;
          var email = user.email;
          var uid = user.uid;
            $ionicLoading.hide();
            $scope.loginData = {};
            $state.go("app.billLists",{newID : "1"});
      }
      else {
        console.log("not logged");
      }
    });

    
});