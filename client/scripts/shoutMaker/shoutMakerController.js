angular.module('shoutr.shoutCreation', [])

.controller('shoutCreationController', ['$scope', 'Shouts', 'Groups', function($scope, Shouts, Groups) {

  $scope.shout = {
    recipient: '',
    groupName: '',
    blurb: '',
    story: '',
    imageLink: '',
    color: 'white'
  };


  $scope.loadGroups = function() {
    Groups.getGroups()
      .then(function(groups) {
        $scope.groups = groups;
        console.log($scope.groups);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  $scope.loadGroups();
  $scope.colors = ['white', '#ff1a1a', '#e60073', '#4d77ff', '#47d147', '#ffff1a', '#ff751a', '#81e8fd',  '#c6b4fe',  '#ffadee',  '#fec6b6',  '#a9faba',  '#fdfab5'];



  $scope.shoutCreated = false;

  $scope.postShout = function() {
      Shouts.saveShout($scope.shout);
      $scope.shout = {
        recipient: '',
        title: '',
        message: '',
        groupName: ''
      };
      $scope.shoutCreated = true;
  }

  // Groups.getGroups()
  //   .then(function(groups){
  //     console.log(groups);
  //   })

  //animation below

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
            var cardBack = $lastElement.find('.back');
            // $('#cloneBack').html(cardBack.html());

            // $('#cloneBack').css({
            //   "background-color": $scope.color, 
            //   "background-image": "url("+shout.imageLink+")"
            // });
            //TODO: attach rear contents of card
          }
        }
      }
    })

    $('.cardContainer').click(function() {

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

        $clone.find('#cloneFront').html($lastElement.html());

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
            'transform': rotateFront
          });
          $clone.find('#cloneBack').css({
            'transform': rotateBack
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

  animationListeners();
  
}]);
