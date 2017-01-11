/*  
    github.com/NickCrawford
    
    Get ready for some jQuery! :)
*/

 jQuery.fn.rotate = function(degrees) {
        $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
            '-moz-transform' : 'rotate('+ degrees +'deg)',
            '-ms-transform' : 'rotate('+ degrees +'deg)',
            'transform' : 'rotate('+ degrees +'deg)'});
        return $(this);
    };

$(document).ready(function() {


    $('#logo').fadeIn(400).delay(400).css('display', 'flex');;

    var windowWidth = $(window).innerWidth();

    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        checkScrollPosition(st);
    });

    // Handle Logo clicks
    $("#logo").click(function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop <= 0) {
            scrollTo(50, 0);
            pokeElement(this);
        } else {
            scrollTo(0);
        }
    });

    // Check if user is stuck on landing screen
    function landingScreenPrompt(zeroCount) {
        setInterval(function() {
            if (!$('#logo').hasClass('away')) {
                pokeElement('#logo');
            }
        }, 15000)
    }

    //Start checking if user on landing screen
    landingScreenPrompt(0);

    checkScrollPosition($(window).scrollTop());

    function checkScrollPosition(scrollTop) {
        var windowHeight = window.innerHeight;
        
        if (scrollTop <= 0) {
            //Landing Content
            $('#panel-wrapper').children().removeClass('away');
            $('#logo').removeClass('away');
            $('#mlh-trust-badge').removeClass('away');
            $('.header-text').removeClass('away');

            $('nav').addClass('hidden');
            $('nav').children().addClass('hidden');
        }

        if (scrollTop > 0) {
            //Content about  
            //$('header').css({'z-index': '110'});
            //Remove Landing Page items
            $('#panel-wrapper').children().addClass('away');
            $('#logo').addClass('away');
            $('#mlh-trust-badge').addClass('away');
            $('.header-text').addClass('away');

            $('nav').removeClass('hidden');
            $('nav').children().removeClass('hidden');
        }

         //Animate content with scrolling
        $('.fabric.one').rotate(45 - scrollTop / 15);
        $('.fabric.two').rotate(30 + scrollTop  / 5);
        $('.fabric.three').rotate(45 - scrollTop  / 3);
    }
    //Resize window and body height
    $(window).resize(function() {
        windowWidth = $(window).innerWidth();
    });

    //Handle Internal Links
    $('.nav-item a').click(function(event){
        if (event.target.hash) {
            event.preventDefault();
        }

        var windowHeight = window.innerHeight;
        var section = event.target.hash;

        var section = section.replace("#", ".");

        console.log(section);
        console.log($(section).offset().top);
        scrollTo($(section).offset().top);

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

    function waggleElement(element) {
        $(element).addClass('waggle');
        setTimeout(function() {
            $(element).removeClass('waggle')
        }, 1000);
    }

    //Animate the apply button
    setInterval(function() {
        waggleElement('.typeform-share');
    }, 7000);

});//End


