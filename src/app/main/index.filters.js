(function() {
    'use strict';

    angular
        .module('bg')
        .directive('english', function () {
            var ENGLISH_REGEXP = /^([a-zA-Z0-9',"\[\]]+\s)*[a-zA-Z0-9',"\[\]]+$/;
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$validators.english = function(modelValue, viewValue) {
                        return !!ENGLISH_REGEXP.test(viewValue);
                    };
                }
            };
        });
})();