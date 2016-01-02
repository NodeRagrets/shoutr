angular.module('shoutr.newsFeed', [

])
.controller('newsFeedController', ['$scope', '$stateParams', 'Shouts', function($scope, $stateParams, Shouts){
  $scope.data = {};
  $scope.data.shouts = [{recipient: 'Bob', title: 'Good job', message:'placeholder', creator: 'Borb'},
  {recipient: 'Bobby', title: 'Good jobb', message:'placeholder', creator: 'Borb'},
  {recipient: 'Bobbi', title: 'Good joba', message:'placeholder', creator: 'Borb'},
  {recipient: 'Bobi', title: 'Good jobd', message:'placeholder', creator: 'Borb'},
  {recipient: 'Bobb', title: 'Good jobf', message:'placeholder', creator: 'Borb'},
  {recipient: 'Bab', title: 'Good jobg', message:'placeholder', creator: 'Borb'},]

  $scope.data.groupname = $stateParams.groupname;
  console.log($scope.data.groupname);

  $scope.getShout = function(){
    Shouts.getShouts()
      .then(function(data){
        $scope.data['shouts'] = data;
      })
      .catch(function(err){
        console.log(err, "Caught an error in getShouts");
      })
  }

  $scope.getShout();

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

  setTimeout(animationListeners, 200);

}])
