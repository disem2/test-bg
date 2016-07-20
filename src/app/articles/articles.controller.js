(function() {
    'use strict';

    angular
        .module('bg.articles', ['bg.article'])
        .controller('ArticlesController', ArticlesController);

    /** @ngInject */
    function ArticlesController(settings, $state) {
        var vm = this;
        
        vm.articlesList = settings.articles;

        vm.openArticle = openArticle;

        //Show default
        $state.transitionTo('main.articles.article', {'id': 1});

        function openArticle(id) {
            $state.transitionTo('main.articles.article', {'id': id});
        }
    }
})();
