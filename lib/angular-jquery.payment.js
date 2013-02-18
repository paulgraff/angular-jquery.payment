'require strict';

angular.module('Payment', []).
factory('PaymentHelpers', [function() {
    return {
        cardExpiryVal: function(value) {
            return $.payment.cardExpiryVal(value);
        },   
        validateCardNumber: function(num) {
            return $.payment.validateCardNumber(num);
        },
        validateCardExpiry: function(month, year) {
            return $.payment.validateCardExpiry(month, year);
        },
        validateCardCVC: function(cvc, type) {
            return $.payment.validateCardCVC(cvc, type);
        },
        cardType: function(num) {
            return $.payment.cardType(num);
        },
        formatCardNumber: function(num) {
            return $.payment.formatCardNumber(num);
        } 
    };
}]).
directive('formatCardNumber', [function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('formatCardNumber');
            });
        }
    };
}]).
directive('formatCardExpiry', [function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('formatCardExpiry');
            });
        }
    };
}]).
directive('formatCardCvc', [function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('formatCardCVC');
            });
        }
    };
}]).
directive('restrictNumeric', [function() {
    return {
        scope: false,
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                element.payment('restrictNumeric');
            });
        }
    };
}]).
directive('cardExpiryVal', [function() {
    return {
        scope: {
            expiryVal: '='
        },
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.ready(function() {
                scope.expiryVal = element.payment('cardExpiryVal');
            });
        }
    };
}]).
directive('cardNumber', ['PaymentHelpers', function(PaymentHelpers) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (PaymentHelpers.validateCardNumber(viewValue)) {
                    ctrl.$setValidity('cardNumber', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('cardNumber', false);
                    return undefined;
                }
            });
        }
    };
}]).
directive('cardExpiry', ['PaymentHelpers', function(PaymentHelpers) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var cardExpiry = PaymentHelpers.cardExpiryVal(viewValue);
                if (PaymentHelpers.validateCardExpiry(cardExpiry.month, cardExpiry.year)) {
                    ctrl.$setValidity('cardExpiry', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('cardExpiry', false);
                    return undefined;
                }
            });
        }
    };
}]).
directive('cardCvc', ['PaymentHelpers', function(PaymentHelpers) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (PaymentHelpers.validateCardCVC(viewValue)) {
                    ctrl.$setValidity('cardCVC', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('cardCVC', false);
                    return undefined;
                }
            });
        }
    };
}]);