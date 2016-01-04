angular.module('shoutr.newsFeed', [

])
.controller('newsFeedController', ['$scope', '$stateParams', 'Shouts', 'Groups', function($scope, $stateParams, Shouts, Groups){
  $scope.data = {};
  $scope.data.shouts = [{recipient: 'Bob', title: 'Good job', message:'placeholder', creator: 'Borb', color: 'white'},
  {recipient: 'Bobby', title: 'Good jobb', message:'placeholder', creator: 'Borb', color: 'green', imageLink: 'http://2.bp.blogspot.com/-qdtzy_7PEG4/U5f2GFtaSZI/AAAAAAAAIs0/-2xe5Xj8s_I/s1600/girl-smiley-face.png'},
  {recipient: 'Bobbi', title: 'Good joba', message:'placeholder', creator: 'Borb', color: 'red'},
  {recipient: 'Bobi', title: 'Good jobd', message:'placeholder', creator: 'Borb', color: 'white'},
  {recipient: 'Bobb', title: 'Good jobf', message:'placeholder', creator: 'Borb', color: 'blue'},
  {recipient: 'Bab', title: 'Good jobg', message:'placeholder', creator: 'Borb', color: 'white'},]

  $scope.data.groupName = $stateParams.groupname;
  console.log($scope.data.groupName);

  $scope.getShout = function(){
    Shouts.getShouts($scope.data.groupName)
      .then(function(data){
        $scope.data['shouts'] = data;
      })
      .catch(function(err){
        console.log(err, "Caught an error in getShouts");
      })
  }

  $scope.getShout();

  // the following is for users in the group

  $scope.data.username = '';
  //TODO :put existing users in usersArray
  $scope.data.usersArray = [];
  $scope.usersAdded = false;
  $scope.addMoreUsers = function(){

    if($scope.data.username){
      var name = $scope.data.username;
      var array = $scope.data.usersArray;

      array.push(name);
      console.log(array, "THIS ARRAYYYYY");

      Groups.addGroupUsers($scope.data);
      $scope.usersAdded = true;
    } else{
      alert('You must enter at least one name');
    }
  }









  //Below is the JS handling the flipping animations

  function animationListeners(){


    var $clone = $('#cardClone');
    var $lastElement = '';
    var lastElement = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }
    var cloneFlipped = false;
    var margin = 0;

    $clone.on('transitionend', function(e) {
      if(e.target === e.currentTarget) {
        if(e.originalEvent.propertyName === 'top') {
          cloneFlipped = !cloneFlipped;

          if(!cloneFlipped) {
            $lastElement.css('opacity', 1);
            $clone.hide();
            console.log($lastElement);
          } else {
        console.log('transitionend');
            var cardBack = $lastElement.find('.back');
            $('#cloneBack').html(cardBack.html());

            //TODO: attach rear contents of card
          }
        }
      }
    })

    $('.cardContainer').click(function() {
      console.log('whoah');

      if(!cloneFlipped) {
        $lastElement = $(this);

        var offset = $lastElement.offset();
        lastElement.top = offset.top - margin - $(document).scrollTop();
        lastElement.left = offset.left - margin;
        lastElement.width = $lastElement.width();
        lastElement.height = $lastElement.height();

        var rotateFront = 'rotateY(180deg)';
        var rotateBack = 'rotateY(0deg)';
        if((lastElement.left + lastElement.width/2) > $(window).width()/2) {
          rotateFront = 'rotateY(-180deg)';
          rotateBack = 'rotateY(-360deg)';
        }

        var cardBack = $(this).find('.back');

        $clone.find('#cloneBack').html(cardBack.html());

        $clone.find('#cloneFront').html($lastElement.html());

        var color = $(this).css('background-color');

        $clone.find('#cloneFront').css({
            'background-color': color
          });
          $clone.find('#cloneBack').css({
            'background-color': color
          });

        $clone.css({
          'display':'block',
          'top': lastElement.top,
          'left': lastElement.left
        });
        $lastElement.css('opacity', 0);

        setTimeout(function(){
          $clone.css({
            'top': '10%',
            'left':'25%',
            'height': '75%',
            'width': $(document).width() - 400 + 'px'
          });
          $clone.find('#cloneFront').css({
            'transform': rotateFront,
            'background-color': color
          });
          $clone.find('#cloneBack').css({
            'transform': rotateBack,
            'background-color': color
          });
        }, 100);
      } else {
        $('body').click();
      }
    });

    $('#content-wrapper').click(function(e) {
      if(cloneFlipped) {
        // if(e.target === e.currentTarget) {
      console.log('why', cloneFlipped);
          $clone.css({
            'top': lastElement.top + 'px',
            'left': lastElement.left + 'px',
            'height': lastElement.height + 'px',
            'width': lastElement.width + 'px'
          });
          $clone.find('#cloneFront').css({
            'transform': 'rotateY(0deg)'
          });
          $clone.find('#cloneBack').css({
            'transform': 'rotateY(-180deg)'
          });
        // }
      }
    })
  }

  setTimeout(animationListeners, 200);

}])
