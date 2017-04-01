/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports) {

VisitPortal.controller('AuthController', ['$scope', '$compile', '$http', '$timeout', function ($scope, $compile, $http, $timeout) {
    $scope.show = false;

    $scope.loginError = false;
    $scope.showErrorEmail = false;
    $scope.showErrorCode = false;

    $scope.focusInput = false;

    $scope.auth = {
        code: '',
        email: ''
    }, $scope.preloadCode = function () {
        var queries = window.location.search.substring(1).split('&');

        for (var i = queries.length - 1; i >= 0; i--) {
            var param = queries[i].split('=');
            if (param[0] == 'code') $scope.auth.code = param[1].replace('.', '');
        }
    };

    $scope.validate = function () {
        $scope.setLoginError(false);

        var postData = {
            code: $scope.auth.code.toUpperCase(),
            email: $scope.auth.email
        };

        $http.post('/service/auth/validate', postData).success(function (data) {
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

    $scope.setLoginError = function (_error) {
        if (typeof _error == 'undefined') _error = false;
        $scope.loginError = _error;
        $scope.showErrorEmail = false;
        $scope.showErrorCode = false;
    };

    $scope.close = function () {
        $scope.show = false;
        $scope.focusInput = false;
    };

    $scope.$on('termAccepted', function (event) {
        $scope.validate();
    });

    $scope.$on('showAuth', function (event) {
        $scope.show = true;
        $scope.focusInput = true;
    });

    $scope.preloadCode();
}]);

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

VisitPortal.controller('BannerController', ['$rootScope', '$scope', '$http', '$window', '$interval', '$timeout', function ($rootScope, $scope, $http, $window, $interval, $timeout) {
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

    $scope.openAuth = function () {
        $rootScope.$broadcast('showAuth');
    };

    $scope.removeLoading = function () {
        document.getElementById("loader").className = 'animated fadeOut';

        $timeout(function () {
            document.body.removeChild(document.getElementById('loader'));
        }, 700);
    };

    $scope.$on('pageLoaded', function (event) {
        if (_interval == null) {
            _interval = $interval(function () {
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
}]);

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

VisitPortal.controller('ContactController', ['$scope', '$http', function ($scope, $http) {
    $scope.data = {
        name: '',
        company: '',
        email: '',
        phone: ''
    };

    $scope.validate = function () {

        $http.post('/service/contact/validate', $scope.data).success(function (data) {
            alert('E-mail enviado com sucesso');

            // zera os valores
            $scope.data.name = '';
            $scope.data.company = '';
            $scope.data.email = '';
            $scope.data.phone = '';
        });
    };
}]);

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

VisitPortal.controller('FooterController', ['$http', function ($http) {
    var footer = this;

    $http.get(_URL_SERVER_ + 'get_json/footer').success(function (data) {
        footer.data = data;
        footer.languages = data.languages;
    });
}]);

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

VisitPortal.controller('HeaderController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    var header = this;

    _menuMobile = false;

    $http.get(_URL_SERVER_ + 'get_json/header').success(function (data) {
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
}]);

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

VisitPortal.controller('LanguageController', ['$scope', '$document', '$translate', function ($scope, $document, $translate, $element) {
    var language = this;

    this.init = function () {
        language.showMenu = false;
        language.setTxt();
        language.key = _LANGUAGE_;
    };

    this.setTxt = function () {
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

    this.setLanguage = function (key) {
        // set na constante
        _LANGUAGE_ = key;

        language.setTxt();

        // set na library para atualizar site inteiro
        localStorage.setItem('wmvisit_portal_lang', key);
        $translate.use(key);
        language.key = _LANGUAGE_;
    };

    this.closeMenu = function () {
        language.showMenu = false;
        $document.unbind('click', this);
    };

    this.btnAction = function ($event) {
        $event.stopPropagation();

        if (!language.showMenu) {
            $document.bind('click', function (event) {
                $scope.$apply(function () {
                    language.closeMenu();
                });
            });

            language.showMenu = true;
        } else {
            language.showMenu = false;
        }
    };

    this.init();
}]);

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

VisitPortal.controller('MenuMobileController', ['$scope', '$http', function ($scope, $http) {
    var menuMobile = this;

    $scope.languages = [];
    $scope.support = [];
    $scope.show = false;

    $http.get(_URL_SERVER_ + 'get_json/menu-mobile').success(function (data) {
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
}]);

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

VisitPortal.controller('PortalController', ['$scope', '$rootScope', '$timeout', '$document', function ($scope, $rootScope, $timeout, $document) {
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

    $scope.showElement = function (event) {

        for (var i = 0; i < _elements.length; i++) {
            topElement = _elements[i].top + _elements[i].height + _headerHeight;
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

    $scope.handleHeader = function () {
        var headerClass = _header.className;

        if (window.scrollY > document.querySelector('.module-banner').offsetHeight - _header.offsetHeight) {
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

    $scope.scroll = function () {
        $document.scrollToElement(angular.element(document.querySelector('body')), 30, 800);
    };

    $scope.$on('pageLoaded', function () {
        $scope.getElements();
    });
}]);

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(16);
__webpack_require__(11);
__webpack_require__(15);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
module.exports = __webpack_require__(17);


/***/ })

/******/ });