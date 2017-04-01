VisitPortal.controller(
    'LanguageController',
    ['$scope', '$document', '$translate',
        function($scope, $document, $translate, $element) {
            var language = this;

            this.init = function () {
                language.showMenu = false;
                language.setTxt();
                language.key = _LANGUAGE_;
            };

            this.setTxt = function () {
                var txt = "";

                switch(_LANGUAGE_) {
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

            this.btnAction = function($event) {
                $event.stopPropagation();

                if (!language.showMenu) {
                    $document.bind('click', function(event) {
                        $scope.$apply(function(){
                            language.closeMenu();
                        })
                    });

                    language.showMenu = true;
                } else {
                    language.showMenu = false;
                }
            }

            this.init();
        }
    ]
);