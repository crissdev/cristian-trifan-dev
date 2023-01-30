/*
* Template Name: Leven - Resume / CV / vCard Template
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.5.0
*/

(function($) {
"use strict";
    var body = $('body');

    // Animate layout
    function animateLayout() {
        var windowWidth = $(window).width(),
            animatedContainer = '',
            animateType = $('#page_container').attr('data-animation')

        if (windowWidth > 991) {
            animatedContainer = $(".page-container");
        } else {
            animatedContainer = $(".site-main");
        }

        animatedContainer.addClass("animated " + animateType);
        $('.page-scroll').addClass('add-prespective');
        animatedContainer.addClass('transform3d');
        setTimeout(function() {
            $('.page-scroll').removeClass('add-prespective');
            animatedContainer.removeClass('transform3d');
        }, 1000);
    }
    // /Animate layout

    function scrollTop() {
        $('.lmpixels-scroll-to-top').toggleClass('hidden-btn', $(body).scrollTop() <= 150);
    }

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut( 800, "linear" );
            animateLayout();
        });


    // On Document Load
    $(document).ready(function () {
        $("body").scroll(scrollTop);

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('.site-nav')
                .addClass('animate')
                .toggleClass('mobile-menu-hide');
        });

        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 10,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        // Clients Slider
        $(".clients.owl-carousel").imagesLoaded().owlCarousel({
            nav: false, // Show next/prev buttons.
            items: 2, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 10,
            autoHeight: false,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items: 2,
                },
                // breakpoint from 768 up
                768 : {
                    items: 4,
                },
                1200 : {
                    items: 6,
                }
            }
        });

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $(this).toggleClass('open');
        });

        $('.lmpixels-scroll-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });

        scrollTop();
    });

})(jQuery);