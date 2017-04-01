VisitPortal.controller(
    'HeaderController',
    ['$scope', '$rootScope','$http',
        function($scope, $rootScope, $http) {
            var header = this;

            _menuMobile = false;

            $http.get(_URL_SERVER_ + 'get_json/header').success( function(data) {
                header.languages = data.languages;
                header.help = data.help;
            });

            this.menuMobile = function () {
                _menuMobile = !_menuMobile;
                $rootScope.$broadcast('showMenuMobile', _menuMobile);
            };

            $scope.$on('hideMenuMobile', function (event) {
                _menuMobile = false;
            });
        }
    ]
);