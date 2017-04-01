VisitPortal.controller(
    'PortalController',
    ['$scope', '$rootScope', '$timeout', '$document',
        function($scope, $rootScope, $timeout, $document) {
            _elements = [];

            _header = null;
            _headerHeight = null;

            $scope.init = function () {
                _header = document.querySelector('.header');
                _headerHeight = _header.offsetHeight;
                window.onscroll = $scope.showElement;
            };

            $scope.getElements = function () {

                var elements = document.querySelectorAll('.main .target-effect');

                for(var i = 0; i < elements.length; i++) {
                    var rect = elements[i].getBoundingClientRect();

                    if ( rect.top == 0 ) {
                        $timeout($scope.getElements, 300);
                        return;
                    }

                    _elements.push({
                        node : elements[i],
                        top : rect.top,
                        height : rect.height
                    });
                }

            };

            $scope.showElement = function (event) {

                for(var i = 0; i < _elements.length; i++) {
                    topElement = (_elements[i].top + _elements[i].height) + _headerHeight;
                    topGeneral = window.scrollY + window.height;

                    if (topGeneral > topElement) {
                        var effect = _elements[i].node.getAttribute('data-effect');

                        if ( _elements[i].node.className.indexOf(effect) == -1 ) {
                            _elements[i].node.className += ' effected ' + effect;
                        }

                    }
                }

                $scope.handleHeader();
            };

            $scope.handleHeader = function () {
                var headerClass = _header.className;

                if ( window.scrollY > (document.querySelector('.module-banner').offsetHeight - _header.offsetHeight) ) {
                    if ( headerClass.indexOf('fixed') == -1 ) {
                        _header.className += ' ' + 'fixed fadeIn';
                    }
                } else {
                    headerClass = headerClass.replace('fixed', '');
                    headerClass = headerClass.replace('fadeIn', '');
                    _header.className = headerClass;

                    $rootScope.$broadcast('hideMenuMobile');
                }
            };

            $scope.scroll = function () {
                $document.scrollToElement(angular.element(document.querySelector('body')), 30, 800);
            };

            $scope.$on('pageLoaded', function () {
                $scope.getElements();
            });
        }
    ]
);