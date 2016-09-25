// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('mobileApp', ['ionic', 'ngCordova','mobileApp.controllers', 'mobileApp.services'])

    .run(function($ionicPlatform, $rootScope, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
})

    .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/sidebar.html',
        controller: 'AppCtrl'
    })

        .state('app.home', {
        url: '/home',
        views: {
            'mainContent': {
                templateUrl: 'templates/home.html',
                controller: 'IndexController',
                resolve:{
                    dish:['menuFactory',function(menuFactory){
                        return menuFactory.get({id:0});
                    }],
                    promotion:['promotionFactory',function(promotionFactory){
                        return promotionFactory.get({id:0});
                    }],
                    leader:['corporateFactory',function(corporateFactory){
                        return corporateFactory.get({id:3});
                    }]

                }
            }
        }
    })

    .state('app.appointments', {
    url: '/appointments',
    views: {
        'mainContent': {
            templateUrl: 'templates/appointments.html',
            controller: 'AppointmentController',
            resolve:{
                dish:['menuFactory',function(menuFactory){
                    return menuFactory.get({id:0});
                }],
                promotion:['promotionFactory',function(promotionFactory){
                    return promotionFactory.get({id:0});
                }],
                leader:['corporateFactory',function(corporateFactory){
                    return corporateFactory.get({id:3});
                }]

            }
        }
    }
})

.state('app.profile', {
url: '/profile',
views: {
    'mainContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileController',
        resolve:{
            dish:['menuFactory',function(menuFactory){
                return menuFactory.get({id:0});
            }],
            promotion:['promotionFactory',function(promotionFactory){
                return promotionFactory.get({id:0});
            }],
            leader:['corporateFactory',function(corporateFactory){
                return corporateFactory.get({id:3});
            }]

        }
    }
}
})





    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

});
