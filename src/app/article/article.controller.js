(function() {
    'use strict';

    angular
    .module('bg.article', [])
        .controller('ArticleController', ArticleController);

    /** @ngInject */
    function ArticleController($stateParams, bgArticleService) {
        var vm = this;
        var articleId = $stateParams.id;
        
        vm.isEditMode = false;
        
        vm.edit = edit;
        vm.save = save;

        bgArticleService.getArticle(articleId).then(function (response) {
            vm.article = response.data;
        },
        function (err) {
            console.log(err);
        });
        
        function edit() {
            vm.isEditMode = true;
        }
        function save() {
            if(vm.editForm.$invalid) return;
            vm.isEditMode = false;
        }
    }

})();