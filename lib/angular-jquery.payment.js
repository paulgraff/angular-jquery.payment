'require strict';

angular.module('payment', []).
directive('formatCardNumber', function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('formatCardNumber');
            });
        }
    };
}).
directive('formatCardExpiry', function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('formatCardExpiry');
            });
        }
    };
}).
directive('formatCardCvc', function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('formatCardCVC');
            });
        }
    };
}).
directive('restrictNumeric', function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('restrictNumeric');
            });
        }
    };
});
