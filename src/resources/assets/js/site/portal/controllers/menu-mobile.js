VisitPortal.controller(
    'MenuMobileController',
    ['$scope','$http',
        function($scope, $http) {
            var menuMobile = this;

            $scope.languages = [];
            $scope.support = [];
            $scope.show = false;

            $http.get(_URL_SERVER_ + 'get_json/menu-mobile').success( function(data) {
                $scope.languages = data.languages;
                $scope.support = data.support;
            });

            $scope.$on('showMenuMobile', function (event, data) {
                $scope.show = data;
            });

            $scope.$on('hideMenuMobile', function (event) {
                $scope.$apply(function () {
                    $scope.show = false;
                });
            });

        }
    ]
);