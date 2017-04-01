VisitPortal.controller(
    'FooterController',
    ['$http',
        function($http) {
            var footer = this;

            $http.get(_URL_SERVER_ + 'get_json/footer').success( function(data) {
                footer.data = data;
                footer.languages = data.languages;
            });
        }
    ]
);