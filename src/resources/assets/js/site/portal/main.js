var _LANGUAGE_ = "pt_BR";
var _URL_SERVER_ = "//" + location.host + "/request/";
var _TYPE_PAGE_ = 'portal';
var VisitPortal = angular.module('VisitPortal', ['pascalprecht.translate', 'chieffancypants.loadingBar', 'duScroll', 'focus-if']);

// config
VisitPortal.config(
    ['$interpolateProvider', '$translateProvider', 'cfpLoadingBarProvider',
        function ($interpolateProvider, $translateProvider, cfpLoadingBarProvider) {
            // muda o padrao de print do Angular. O padrão é  {{ }}
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');

            // Translate Angular
            $translateProvider.useLoader('LanguageLoader', {});

            // language
            _LANGUAGE_ = 'pt_BR';
            if( localStorage) {
                if( localStorage.getItem('wmvisit_portal_lang') ) {
                    _LANGUAGE_ = localStorage.getItem('wmvisit_portal_lang');
                }
            }
            $translateProvider.preferredLanguage(_LANGUAGE_);
        }
    ]
);