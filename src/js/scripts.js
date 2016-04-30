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

    /*****************************
    / Coverr Video JS Reflection
    *****************************/

    document.addEventListener('DOMContentLoaded', function(){
      var v = document.getElementById('header-video'),
          vch = document.getElementById('video-container').offsetHeight,
          vcw = document.getElementById('video-container').offsetWidth,
          canvas = document.getElementById('reflection'),
          context = canvas.getContext('2d');

      var cw = vcw;
      var ch = vch;
      canvas.width = cw;
      canvas.height = ch;

      v.addEventListener('play', function(){
          draw(this,context,cw,ch);
      },false);

  },false);

  function draw(v,c,w,h) {
      if(v.paused || v.ended) return false;
      c.drawImage(v,0,0,w,h);
      setTimeout(draw,20,v,c,w,h);
  }

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
