(function() {
    'use strict';

    angular
        .module('bg.article')
        .service('bgArticleService', ArticleService);

    /** @ngInject */
    function ArticleService($http, settings) {
        this.getArticle = getArticle;

        function getArticle(id) {
            var url = settings.HOST + id;

            return $http({
                method: 'GET',
                url: url
            });
        }
    }

})();
