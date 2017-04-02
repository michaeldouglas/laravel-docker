var _LANGUAGE_ = "pt_BR";
var _URL_SERVER_ = "//" + location.host + "/api/request/";
var _TYPE_PAGE_ = 'portal';
var VisitPortal = angular.module('VisitPortal', ['pascalprecht.translate', 'chieffancypants.loadingBar', 'duScroll', 'focus-if']);
VisitPortal.config(['$interpolateProvider', '$translateProvider', 'cfpLoadingBarProvider', function($interpolateProvider, $translateProvider, cfpLoadingBarProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $translateProvider.useLoader('LanguageLoader', {});
    _LANGUAGE_ = 'pt_BR';
    if (localStorage) {
        if (localStorage.getItem('wmvisit_portal_lang')) {
            _LANGUAGE_ = localStorage.getItem('wmvisit_portal_lang');
        }
    }
    $translateProvider.preferredLanguage(_LANGUAGE_);
}]);

VisitPortal.factory('LanguageLoader', function($http, $timeout, $rootScope, $q, cfpLoadingBar) {
    return function(options) {
        cfpLoadingBar.start();
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: _URL_SERVER_ + 'get_locale/' + _TYPE_PAGE_ + '/' + _LANGUAGE_
        }).success(function(data) {
            deferred.resolve(data);
            if (document.getElementById("pre-loader") != null) {
                $rootScope.$broadcast('pageLoaded');
                cfpLoadingBar.complete();
                document.getElementById("pre-loader").className = 'animated fadeIn';
            }
        }).error(function() {
            deferred.reject(options.key);
        });
        return deferred.promise;
    };
});

VisitPortal.controller('PortalController', ['$scope', '$rootScope', '$timeout', '$document', function($scope, $rootScope, $timeout, $document) {
    _elements = [];
    _header = null;
    _headerHeight = null;
    $scope.init = function() {
        _header = document.querySelector('.header');
        _headerHeight = _header.offsetHeight;
        window.onscroll = $scope.showElement;
    };
    $scope.getElements = function() {
        var elements = document.querySelectorAll('.main .target-effect');
        for (var i = 0; i < elements.length; i++) {
            var rect = elements[i].getBoundingClientRect();
            if (rect.top == 0) {
                $timeout($scope.getElements, 300);
                return;
            }
            _elements.push({
                node: elements[i],
                top: rect.top,
                height: rect.height
            });
        }
    };
    $scope.showElement = function(event) {
        for (var i = 0; i < _elements.length; i++) {
            topElement = (_elements[i].top + _elements[i].height) + _headerHeight;
            topGeneral = window.scrollY + window.height;
            if (topGeneral > topElement) {
                var effect = _elements[i].node.getAttribute('data-effect');
                if (_elements[i].node.className.indexOf(effect) == -1) {
                    _elements[i].node.className += ' effected ' + effect;
                }
            }
        }
        $scope.handleHeader();
    };
    $scope.handleHeader = function() {
        var headerClass = _header.className;
        if (window.scrollY > (document.querySelector('.module-banner').offsetHeight - _header.offsetHeight)) {
            if (headerClass.indexOf('fixed') == -1) {
                _header.className += ' ' + 'fixed fadeIn';
            }
        } else {
            headerClass = headerClass.replace('fixed', '');
            headerClass = headerClass.replace('fadeIn', '');
            _header.className = headerClass;
            $rootScope.$broadcast('hideMenuMobile');
        }
    };
    $scope.scroll = function() {
        $document.scrollToElement(angular.element(document.querySelector('body')), 30, 800);
    };
    $scope.$on('pageLoaded', function() {
        $scope.getElements();
    });
}]);;
VisitPortal.controller('LanguageController', ['$scope', '$document', '$translate', function($scope, $document, $translate, $element) {
    var language = this;
    this.init = function() {
        language.showMenu = false;
        language.setTxt();
        language.key = _LANGUAGE_;
    };
    this.setTxt = function() {
        var txt = "";
        switch (_LANGUAGE_) {
            case 'pt_BR':
                language.txtFooter = 'LANGUAGE_PORTUGUESE';
                language.txtHeader = 'PT';
                break;
            case 'en_US':
                language.txtFooter = 'LANGUAGE_ENGLISH';
                language.txtHeader = 'EN';
                break;
            case 'es_ES':
                language.txtFooter = 'LANGUAGE_SPANISH';
                language.txtHeader = 'ES';
                break;
        }
        return txt;
    };
    this.setLanguage = function(key) {
        _LANGUAGE_ = key;
        language.setTxt();
        localStorage.setItem('wmvisit_portal_lang', key);
        $translate.use(key);
        language.key = _LANGUAGE_;
    };
    this.closeMenu = function() {
        language.showMenu = false;
        $document.unbind('click', this);
    };
    this.btnAction = function($event) {
        $event.stopPropagation();
        if (!language.showMenu) {
            $document.bind('click', function(event) {
                $scope.$apply(function() {
                    language.closeMenu();
                })
            });
            language.showMenu = true;
        } else {
            language.showMenu = false;
        }
    }
    this.init();
}]);;
VisitPortal.controller('AuthController', ['$scope', '$compile', '$http', '$timeout', function($scope, $compile, $http, $timeout) {
    $scope.show = false;
    $scope.loginError = false;
    $scope.showErrorEmail = false;
    $scope.showErrorCode = false;
    $scope.focusInput = false;
    $scope.auth = {
        code: '',
        email: ''
    }, $scope.preloadCode = function() {
        var queries = window.location.search.substring(1).split('&');
        for (var i = (queries.length - 1); i >= 0; i--) {
            var param = queries[i].split('=');
            if (param[0] == 'code') $scope.auth.code = param[1].replace('.', '');
        }
    };
    $scope.validate = function() {
        $scope.setLoginError(false);
        var postData = {
            code: $scope.auth.code.toUpperCase(),
            email: $scope.auth.email
        }
        $http.post('/service/auth/validate', postData).success(function(data) {
            if (data.result) {
                window.location.href = data.url;
            } else {
                $scope.setLoginError(true);
                if (data.error == "ERROR_UNAUTHORIZED") {
                    $scope.showErrorEmail = true;
                    $scope.showErrorCode = false;
                }
                if (data.error == "ERROR_CODE") {
                    $scope.showErrorEmail = false;
                    $scope.showErrorCode = true;
                }
                $timeout($scope.setLoginError, 5000);
            }
        });
    };
    $scope.setLoginError = function(_error) {
        if (typeof _error == 'undefined') _error = false;
        $scope.loginError = _error;
        $scope.showErrorEmail = false;
        $scope.showErrorCode = false;
    };
    $scope.close = function() {
        $scope.show = false;
        $scope.focusInput = false;
    };
    $scope.$on('termAccepted', function(event) {
        $scope.validate();
    });
    $scope.$on('showAuth', function(event) {
        $scope.show = true;
        $scope.focusInput = true;
    });
    $scope.preloadCode();
}]);;
VisitPortal.controller('HeaderController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    var header = this;
    _menuMobile = false;
    $http.get(_URL_SERVER_ + 'get_json/header').success(function(data) {
        header.languages = data.languages;
        header.help = data.help;
    });
    this.menuMobile = function() {
        _menuMobile = !_menuMobile;
        $rootScope.$broadcast('showMenuMobile', _menuMobile);
    };
    $scope.$on('hideMenuMobile', function(event) {
        _menuMobile = false;
    });
}]);;
VisitPortal.controller('BannerController', ['$rootScope', '$scope', '$http', '$window', '$interval', '$timeout', function($rootScope, $scope, $http, $window, $interval, $timeout) {
    _minHeight = 465;
    _el = document.querySelector('.module-banner');
    _elHeader = document.querySelector('.header');
    _elContainer = document.querySelector('.module-banner .container');
    _interval = null;
    $scope.init = function() {
        $scope.resize();
        angular.element(window).bind('resize', $scope.resize);
    };
    $scope.resize = function() {
        var heightScreen = window.innerHeight;
        var widthScreen = window.innerWidth;
        if (widthScreen > 991) {
            _minHeight = heightScreen;
        }
        if (heightScreen < _minHeight) {
            height = _minHeight;
        } else {
            height = heightScreen;
        }
        _el.style.height = height + 'px';
        _elContainer.style.marginTop = '-' + (_elContainer.offsetHeight - _elHeader.offsetHeight - 80) + 'px';
    };
    $scope.openAuth = function() {
        $rootScope.$broadcast('showAuth');
    };
    $scope.removeLoading = function() {
        document.getElementById("loader").className = 'animated fadeOut';
        $timeout(function() {
            document.body.removeChild(document.getElementById('loader'));
        }, 700);
    };
    $scope.$on('pageLoaded', function(event) {
        if (_interval == null) {
            _interval = $interval(function() {
                if (_elContainer.offsetHeight > 0) {
                    $scope.resize();
                    $interval.cancel(_interval);
                    $scope.removeLoading();
                } else {
                    console.log('reload');
                }
            }, 500);
        }
    });
}]);;
VisitPortal.controller('ContactController', ['$scope', '$http', function($scope, $http) {
    $scope.data = {
        name: '',
        company: '',
        email: '',
        phone: ''
    };
    $scope.validate = function() {
        $http.post('/service/contact/validate', $scope.data).success(function(data) {
            alert('E-mail enviado com sucesso');
            $scope.data.name = '';
            $scope.data.company = '';
            $scope.data.email = '';
            $scope.data.phone = '';
        });
    };
}]);;
VisitPortal.controller('FooterController', ['$http', function($http) {
    var footer = this;
    $http.get(_URL_SERVER_ + 'get_json/footer').success(function(data) {
        footer.data = data;
        footer.languages = data.languages;
    });
}]);;
VisitPortal.controller('MenuMobileController', ['$scope', '$http', function($scope, $http) {
    var menuMobile = this;
    $scope.languages = [];
    $scope.support = [];
    $scope.show = false;
    $http.get(_URL_SERVER_ + 'get_json/menu-mobile').success(function(data) {
        $scope.languages = data.languages;
        $scope.support = data.support;
    });
    $scope.$on('showMenuMobile', function(event, data) {
        $scope.show = data;
    });
    $scope.$on('hideMenuMobile', function(event) {
        $scope.$apply(function() {
            $scope.show = false;
        });
    });
}]);