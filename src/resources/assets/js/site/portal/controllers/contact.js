VisitPortal.controller(
    'ContactController',
    ['$scope','$http',
        function($scope, $http) {
            $scope.data = {
                name : '',
                company : '',
                email : '',
                phone : ''
            };

            $scope.validate = function () {

                $http.post('/service/contact/validate', $scope.data)
                    .success(
                        function(data) {
                            alert('E-mail enviado com sucesso');

                            // zera os valores
                            $scope.data.name = '';
                            $scope.data.company = '';
                            $scope.data.email = '';
                            $scope.data.phone = '';
                        }
                    );
            };
        }
    ]
);