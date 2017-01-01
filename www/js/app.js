// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','ngStorage','ngCordova']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    
    // var options = {
    //     android: {
    //       senderID: "835405016346"
    //     },
    //     ios: {
    //       alert: "true",
    //       badge: "true",
    //       sound: "true"
    //     },
    //     windows: {}
    //   };
    //   // initialize
    //   $cordovaPushV5.initialize(options).then(function() {
    //     // start listening for new notifications
    //     $cordovaPushV5.onNotification();
    //     // start listening for errors
    //     $cordovaPushV5.onError();
        
    //     // register to get registrationId
    //     $cordovaPushV5.register().then(function(data) {
    //       // `data.registrationId` save it somewhere;
    //       console.log(data);
    //     })
    //   });
      
    //   // triggered every time notification received
    //   $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
    //     // data.message,
    //     // data.title,
    //     // data.count,
    //     // data.sound,
    //     // data.image,
    //     // data.additionalData
    //     console.log(data);
    //     console.log(data.message);
    //   });

    //   // triggered every time error occurs
    //   $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
    //     // e.message
    //   });


})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('pay', {
        url: '/pay/:billingID',
        templateUrl: 'templates/payment.html',
        controller: 'payCtrl'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.billLists', {
        url: '/billLists/:newID',
        views: {
            'menuContent': {
                templateUrl: 'templates/billLists.html',
                controller: 'billListsCtrl'
            }
        }
    })
    .state('app.pay', {
        url: '/pay/:billingID',
        views: {
            'menuContent': {
                templateUrl: 'templates/payment.html',
                controller: 'payCtrl'
            }
        }
    })
    .state('app.checkoutitem', {
        url: '/checkoutitem/:billingID',
        views: {
            'menuContent': {
                templateUrl: 'templates/checkoutitem.html',
                controller: 'checkoutItemCtrl'
            }
        }
    })
    .state('app.checkoutitemPay', {
        url: '/checkoutitem/:billingID/:transactionID/:payID',
        views: {
            'menuContent': {
                templateUrl: 'templates/checkoutitem.html',
                controller: 'checkoutItemCtrl'
            }
        }
    })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.billHistory', {
        url: '/billHistory/:newID',
        views: {
            'menuContent': {
                templateUrl: 'templates/Bill-History.html',
                controller: 'billHistoryCtrl'
            }
        }
    })
    .state('app.product', {
        url: '/product',
        views: {
            'menuContent': {
                templateUrl: 'templates/product.html',
                controller: 'productCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
