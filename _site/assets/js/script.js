$(document).ready(function() {
    $('#logo').fadeIn(300);

    var numContentPanels = 4;
    var windowWidth = $(window).innerWidth();

    checkScrollPosition(0);

    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        checkScrollPosition(st);
    });

    // Handle Logo clicks
    $("#logo").click(function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop <= 0) {
            scrollTo(1, 0);
            pokeElement(this);
        } else {
            scrollTo(0, 0);
        }
    });

    // Check if user is stuck on landing screen
    function landingScreenPrompt(zeroCount) {
        setTimeout(function() {
            var scrollTop = $(window).scrollTop();

            if (scrollTop == 0) {
                zeroCount += 1;
            } else {
                zeroCount = 0;
            }

            if (!$('#logo').hasClass('away')) {

                if (zeroCount == 6) {
                    pokeElement('#logo');
                }

                if (zeroCount % 16 == 0) {
                    pokeElement('#logo');
                }

                if (zeroCount == 60) {
                    scrollTo(1,0);
                }
            }

            landingScreenPrompt(zeroCount);
        }, 500);
    }

    //Start checking if user on landing screen
    landingScreenPrompt(0);

    function checkScrollPosition(scrollTop) {
        var windowHeight = window.innerHeight;
        
        if (scrollTop <= 0) {
            //Landing Content
            $('#panel-wrapper').children().removeClass('away');
            $('#logo').removeClass('away');
            $('#date').removeClass('away');

            $('nav').children().addClass('hidden');
            
            hidePageOne();
            hidePageTwo();
            hidePageThree();
        }

        if (scrollTop > 0) {
            //Content about  
            //$('header').css({'z-index': '110'});
            //Remove Landing Page items
            $('#panel-wrapper').children().addClass('away');
            $('#logo').addClass('away');
            $('#date').addClass('away');
            $('nav').children().removeClass('hidden');

            //Unhide Page about content
            $('.about').removeClass('hidden');

            hidePageTwo();
            hidePageThree();

            //Animate content with scrolling
            $('.fabric.one').rotate(45 - scrollTop / 15);
            $('.about .content').float( - (scrollTop / 15.0));
        }

        if (scrollTop > windowHeight) {
            //Content sponsor
            $('.sponsor').removeClass('hidden');
            $('.fabric.two').addClass('away');

            //Animate content with scrolling
            $('.fabric.two').rotate(30 + scrollTop  / 5);
            $('.sponsor .content').float( - (scrollTop / 15.0) + (windowHeight*2 / 15.0));

            hidePageOne();
            hidePageThree();
        }

        if (scrollTop > windowHeight * 2) {
            //Content sponsor
            $('.sponsor').addClass('hidden');
            $('.faq').removeClass('hidden');
            $('.fabric.three').addClass('away');

            //Animate content with scrolling
            $('.fabric.three').rotate(45 - scrollTop  / 3);
            $('.faq .content').float( - (scrollTop / 15.0) + (windowHeight*2 / 15.0));
        }
    }

    function hidePageOne() {
        $('.about').addClass('hidden');
    }

    function hidePageTwo() {
        //hide page 2
        $('.sponsor').addClass('hidden');
        $('.fabric.two').removeClass('away');
    }

    function hidePageThree() {
        //hide page 3
        $('.faq').addClass('hidden');
        $('.fabric.three').removeClass('away');
    }

    //Resize window and body height
    $(window).resize(function() {
        resizeBody();
        windowWidth = $(window).innerWidth();
    });

    function resizeBody() {
        $('body').innerHeight(window.innerHeight * numContentPanels);
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
        //Disable on mobile
        if (windowWidth < 960) {
            $(this).css({'transform' : 'translateY(0)'});
        } else {
            $(this).css({'transform' : 'translateY('+amount+'px)'});
        }
        

        return $(this);
    }

    //Handle Internal Links
    $('.nav-item a').click(function(event){
        if (event.target.hash) {
            event.preventDefault();
        }

        var windowHeight = window.innerHeight;
        var section = event.target.hash;

        switch(section) {
            case '#about': scrollTo(1)
            break;
            case '#sponsor': scrollTo(windowHeight + 1);
            break;
            case '#faq': scrollTo(windowHeight*2 + 1);
            break;
            case '#contact': scrollTo(windowHeight*3 + 1);
            break;
        }

        return false;
    });

    function scrollTo(top, speed) {
        var speed = (typeof speed !== 'undefined') ?  speed : 200;
        $('html, body').animate({
            scrollTop: top
        }, speed);
    }

    //Adds the poke animation to an element
    function pokeElement(element) {
        $(element).addClass('poke');
        setTimeout(function() {
            $(element).removeClass('poke')
        }, 1000);
    }

});//End


