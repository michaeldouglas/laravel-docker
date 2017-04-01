VisitPortal.controller(
    'BannerController',
    ['$rootScope', '$scope', '$http', '$window', '$interval', '$timeout',
        function($rootScope, $scope, $http, $window, $interval, $timeout) {
            _minHeight = 465;

            _el = document.querySelector('.module-banner');
            _elHeader = document.querySelector('.header');
            _elContainer = document.querySelector('.module-banner .container');

            _interval = null;

            $scope.init = function () {
                $scope.resize();

                angular.element(window).bind('resize', $scope.resize);
            };

            $scope.resize = function () {
                var heightScreen = window.innerHeight;
                var widthScreen = window.innerWidth;

                if ( widthScreen > 991 ) {
                    _minHeight = heightScreen;
                }

                if ( heightScreen < _minHeight ) {
                    height = _minHeight;
                } else {
                    height = heightScreen;
                }
                _el.style.height = height + 'px';

                _elContainer.style.marginTop = '-' + (_elContainer.offsetHeight - _elHeader.offsetHeight - 80) + 'px';

            };

            $scope.openAuth = function () {
                $rootScope.$broadcast('showAuth');
            };

            $scope.removeLoading = function () {
                document.getElementById("loader").className = 'animated fadeOut';

                $timeout(function () {
                    document.body.removeChild(document.getElementById('loader'));
                }, 700);
            };

            $scope.$on('pageLoaded', function(event) {
                if ( _interval == null ) {
                    _interval = $interval(function () {
                        if ( _elContainer.offsetHeight > 0 ) {
                            $scope.resize();
                            $interval.cancel(_interval);

                            $scope.removeLoading();
                        } else {
                            console.log('reload');
                        }
                    }, 500);
                }
            });

        }
    ]
);