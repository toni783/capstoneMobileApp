angular.module('mobileApp.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
     $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.reservation = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalLogin = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modalLogin.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modalLogin.show();
    };

    // Perform the login action when the user submits the login form
   $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    // Create the Register modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalRegister = modal;
    });

    // Triggered in the Register modal to close it
    $scope.closeRegister = function() {
        $scope.modalRegister.hide();
    };

    // Open the Register modal
    $scope.register = function() {
        $scope.modalRegister.show();
    };

    // Perform the Register action when the user Register the login form
   $scope.doRegister = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    // Create the reserve modal that we will use later
    $ionicModal.fromTemplateUrl('templates/doctor-appointment.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.reserveform = modal;
    });

    // Triggered in the reserve modal to close it
    $scope.closeAppointment = function() {
        $scope.reserveform.hide();
    };

    // Open the reserve modal
    $scope.modalAppointment = function() {
        $scope.reserveform.show();
    };

    // Perform the reserve action when the user submits the reserve form
    $scope.doAppointment = function() {
        console.log('Doing appointment', $scope.reservation);

        // Simulate a reservation delay. Remove this and replace with your reservation
        // code if using a server system
        $timeout(function() {
            $scope.closeAppointment();
        }, 1000);
    };
})

.controller('AppointmentController', ['$scope', 'appointmentFactory', function($scope,appointmentFactory) {
    $scope.doctors = appointmentFactory;

}])

.controller('ProfileController', ['$scope', 'profileFactory', function($scope,appointmentFactory) {
    $scope.doctors = appointmentFactory;

}])

    .controller('MenuController', ['$scope','dishes', 'favoriteFactory', 'baseURL','$localStorage', '$ionicListDelegate', function ($scope,dishes, favoriteFactory, baseURL,$localStorage, $ionicListDelegate) {

        $scope.baseURL= baseURL;
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        $scope.dishes = dishes;



        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };



        $scope.addFavorite = function (index) {
            console.log("index is " + index);
            favoriteFactory.addToFavorites(index);
           /* $localStorage.storeObject('favs',favoriteFactory.getFavorites());*/
            $ionicListDelegate.closeOptionButtons();
        }
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                feedbackFactory.save($scope.feedback);
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL','$localStorage', '$ionicPopover', '$ionicModal','$ionicListDelegate', function ($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL,$localStorage, $ionicPopover, $ionicModal,$ionicListDelegate) {

        $scope.baseURL = baseURL;

        $scope.dish = dish;



        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
            console.log("asdasfas");
        });


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

        $scope.addFavorite = function () {

            favoriteFactory.addToFavorites($scope.dish.id);
            /* $localStorage.storeObject('favs',favoriteFactory.getFavorites());*/
            $scope.closePopover();
            $ionicListDelegate.closeOptionButtons();

        }



        // Create the comment modal that we will use later
        $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.commentform = modal;
        });

        // Triggered in the comment modal to close it
        $scope.closeComment = function() {
            $scope.commentform.hide();
        };

        // Open the comment modal
        $scope.comment = function() {
            $scope.closePopover();
            $ionicListDelegate.closeOptionButtons();
            $scope.commentform.show();
        };



        $scope.mycomment = {rating:5, comment:"", author:"", date:""};

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);
            menuFactory.update({id:$scope.dish.id},$scope.dish);



            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            $scope.closeComment();
        }



    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {


    }])

// implement the IndexController and About Controller here

    .controller('IndexController', ['$scope','dish','promotion','leader', 'baseURL', function ($scope,dish,promotion,leader, baseURL) {

        $scope.baseURL = baseURL;
        $scope.leader = leader;

        $scope.showDish = false;
        $scope.message = "Loading ...";

        $scope.dish = dish;

        $scope.promotion = promotion;

    }])

    .controller('AboutController', ['$scope','leaders', 'baseURL', function($scope,leaders,baseURL) {

        $scope.baseURL= baseURL;
        $scope.leaders = leaders;
        console.log($scope.leaders);

    }])

    .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL','$localStorage', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, dishes, favorites, favoriteFactory, baseURL,$localStorage, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

        $scope.baseURL = baseURL;
        $scope.shouldShowDelete = false;

        $scope.favorites = favorites;



        $scope.dishes = dishes;

        console.log($scope.dishes, $scope.favorites);

        $scope.toggleDelete = function () {
            $scope.shouldShowDelete = !$scope.shouldShowDelete;
            console.log($scope.shouldShowDelete);
        }

        $scope.deleteFavorite = function (index) {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm Delete',
                template: 'Are you sure you want to delete this item?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');

                    favoriteFactory.deleteFromFavorites(index);

                } else {
                    console.log('Canceled delete');
                }
            });

            $scope.shouldShowDelete = false;

        }



    }])


    .filter('favoriteFilter', function () {
    return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id === favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;

    }});

;
