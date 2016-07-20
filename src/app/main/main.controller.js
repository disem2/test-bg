(function() {
    'use strict';

    angular
        .module('bg.main', ['bg.articles'])
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($state) {
        var vm = this;

        $state.transitionTo('main.articles');
    }
})();