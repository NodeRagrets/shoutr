angular.module('shoutr.directives', [])

.directive('toolTip', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).tooltip(scope.$eval(attrs.toolTip));
    }
  }
});