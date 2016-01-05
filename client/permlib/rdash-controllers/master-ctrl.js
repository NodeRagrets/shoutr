/** 
 * Master Controller
 */

angular.module('RDash', ['ngCookies', 'ngFileUpload'])
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'Users', 'Upload', 'PicData', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, Users, PicData) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.logout = function(){
      Users.logout();  
    }

    //allows profile pic to appear throughout app once loaded
    $scope.PicData = PicData;
}