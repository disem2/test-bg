(function() {
    'use strict';

    angular
        .module('bg')
        .factory('settings', settings);

    /** @ngInject */
    function settings() {
        var HOST = 'http://jsonplaceholder.typicode.com/posts/';
        var articles = [
            {id: 1, name: 'Article 1'},
            {id: 2, name: 'Article 2'},
            {id: 3, name: 'Article 3'},
            {id: 4, name: 'Article 4'}
        ];

        return {
            HOST: HOST,
            articles: articles
        };
    }
})();
