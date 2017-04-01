VisitPortal.factory('LanguageLoader',
    function ($http, $timeout, $rootScope, $q, cfpLoadingBar) {
        return function (options) {
            cfpLoadingBar.start();
            var deferred = $q.defer();

            $http({
                method:'GET',
                url: _URL_SERVER_ + 'get_locale/' + _TYPE_PAGE_ + '/' + _LANGUAGE_
            }).success(function (data) {
                deferred.resolve(data);

                // show site
                if(document.getElementById("pre-loader") != null) {
                    $rootScope.$broadcast('pageLoaded');

                    cfpLoadingBar.complete();
                    document.getElementById("pre-loader").className = 'animated fadeIn';
                }
            }).error(function () {
                deferred.reject(options.key);
            });

            return deferred.promise;
        };
    }
);