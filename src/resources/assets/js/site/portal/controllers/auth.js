VisitPortal.controller(
    'AuthController',
    ['$scope', '$compile', '$http', '$timeout',
        function($scope, $compile, $http, $timeout) {
            $scope.show = false;

            $scope.loginError = false;
            $scope.showErrorEmail = false;
            $scope.showErrorCode = false;

            $scope.focusInput = false;

            $scope.auth = {
                code: '',
                email: ''
            },

                $scope.preloadCode = function() {
                    var queries = window.location.search.substring(1).split('&');

                    for (var i = (queries.length - 1); i >= 0; i--) {
                        var param = queries[i].split('=');
                        if (param[0] == 'code') $scope.auth.code = param[1].replace('.', '');
                    }
                };

            $scope.validate = function() {
                $scope.setLoginError(false);

                var postData = {
                    code:  $scope.auth.code.toUpperCase(),
                    email: $scope.auth.email
                }

                $http.post('/service/auth/validate', postData)
                    .success(
                        function(data) {
                            if (data.result) {
                                window.location.href = data.url;
                            } else {
                                $scope.setLoginError(true);

                                if( data.error == "ERROR_UNAUTHORIZED" ) {
                                    $scope.showErrorEmail = true;
                                    $scope.showErrorCode = false;
                                }

                                if ( data.error == "ERROR_CODE" ) {
                                    $scope.showErrorEmail = false;
                                    $scope.showErrorCode = true;
                                }

                                $timeout($scope.setLoginError, 5000);
                            }
                        }
                    );
            };

            $scope.setLoginError = function (_error) {
                if ( typeof _error == 'undefined' ) _error = false;
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
        }

    ]
);