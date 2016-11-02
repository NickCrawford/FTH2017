$(function() {
  var numContentPanels = 5;

checkScrollPosition(0);

$(window).scroll(function(event) {
  var st = $(this).scrollTop();
  checkScrollPosition(st);
});

function checkScrollPosition(scrollTop) {
  var windowHeight = window.innerHeight;
  if (scrollTop <= 0) {
    //Landing Content
    $('#panel-wrapper').children().removeClass('away');
    $('#logo').removeClass('away');
    $('#about').addClass('hidden');
    $('nav').children().addClass('hidden');

  }
  
  if (scrollTop > 0) {
    //Content about  
    
    //Remove Landing Page items
    $('#panel-wrapper').children().addClass('away');
    $('#logo').addClass('away');
    $('nav').children().removeClass('hidden');
    
    //Unhide Page about content
    $('#about').removeClass('hidden');
    
    //hide page 2
    $('#sponsor').addClass('hidden');
    $('.fabric.sponsor').removeClass('away');
    
    //Animate content with scrolling
    $('.fabric.about').rotate(45 - scrollTop / 15);
    $('#about .content').float( - (scrollTop / 15));
    
  }
  
  if (scrollTop > windowHeight && scrollTop <= windowHeight * 2) {
    //Content sponsor
    $('#about').addClass('hidden');
    $('#sponsor').removeClass('hidden');
    $('.fabric.sponsor').addClass('away');
    
    //Animate content with scrolling
    $('.fabric.sponsor').rotate(30 + scrollTop  / 5);
    $('#sponsor .content').float( - (scrollTop % (windowHeight+1)  / 15));
    //$('.fabric.about').rotate(0 - scrollTop % (windowHeight + 1)  / 15);
  }
}

//Resize window and body height
$(window).resize(function() {
  resizeBody();
});

function resizeBody() {
  console.log("resize"); $('body').innerHeight(window.innerHeight * numContentPanels);
}

resizeBody();

jQuery.fn.rotate = function(degrees) {
  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
   '-moz-transform' : 'rotate('+ degrees +'deg)',
   '-ms-transform' : 'rotate('+ degrees +'deg)',
   'transform' : 'rotate('+ degrees +'deg)'});
  return $(this);
};

jQuery.fn.float = function(amount) {
  $(this).css({'transform' : 'translateY('+amount+'px)'});
  
  return $(this);
}

  //Handle Internal Links
  $('.nav-item a').click(function(event){
      event.preventDefault();
      
      var windowHeight = window.innerHeight;
      var section = event.target.hash;

      switch(section) {
        case '#about': scrollTo(1)
        break;
        case '#sponsor': scrollTo(windowHeight + 1);
        break;
        case '#faq': scrollTo(windowHeight*2 + 1);
        break;
      }

      return false;
  });

  function scrollTo(top) {
    $('html, body').animate({
      scrollTop: top
    }, 200);
  }

});//End


