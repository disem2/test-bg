(function() {
    'use strict';

    angular
        .module('bg')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('main.articles', {
                url: 'articles',
                templateUrl: 'articles/articles.html',
                controller: 'ArticlesController',
                controllerAs: 'vm'
            })
            .state('main.articles.article', {
                url: '/:id',
                templateUrl: 'article/article.html',
                controller: 'ArticleController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');


    }

})();