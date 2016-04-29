// smoothState.js
;(function ($) {
  'use strict';
  var $body = $('html, body'),
      $wave = $('#wave'),
      options = {
        prefetch: true,
        pageCacheSize: 4,
        onStart: {
          duration: 3000,
          render: function (url, $container) {
            $body.animate({
              scrollTop: 0
            });
            $wave.addClass('is-exiting');
            smoothState.restartCSSAnimations();
          }
        },
        onEnd: {
          duration: 0,
          render: function (url, $container, $content) {
            $wave.removeClass('is-exiting');
            $wave.html($content);
            $body.css('cursor', 'auto');
            $body.find('a').css('cursor', 'auto');
          }
        }
      },
      smoothState = $wave.smoothState(options).data('smoothState');

  /*******************
  / Coverr Video JS
  *******************/
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });
})(jQuery);

/*************************
/ Coverr Video functions
*************************/

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
