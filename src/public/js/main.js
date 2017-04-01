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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports) {

var _LANGUAGE_ = "pt_BR";
var _URL_SERVER_ = "//" + location.host + "/request/";
var _TYPE_PAGE_ = 'portal';
var VisitPortal = angular.module('VisitPortal', ['pascalprecht.translate', 'chieffancypants.loadingBar', 'duScroll', 'focus-if']);

// config
VisitPortal.config(['$interpolateProvider', '$translateProvider', 'cfpLoadingBarProvider', function ($interpolateProvider, $translateProvider, cfpLoadingBarProvider) {
    // muda o padrao de print do Angular. O padrão é  {{ }}
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    // Translate Angular
    $translateProvider.useLoader('LanguageLoader', {});

    // language
    _LANGUAGE_ = 'pt_BR';
    if (localStorage) {
        if (localStorage.getItem('wmvisit_portal_lang')) {
            _LANGUAGE_ = localStorage.getItem('wmvisit_portal_lang');
        }
    }
    $translateProvider.preferredLanguage(_LANGUAGE_);
}]);

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ })

/******/ });