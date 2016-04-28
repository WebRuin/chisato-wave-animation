// smoothState.js
;(function ($) {
    'use strict';
    var $body = $('html, body'),
        $wave = $('#wave'),
        options = {
            prefetch: true,
            pageCacheSize: 4,
            onStart: {
                duration: 250,
                render: function (url, $container) {
                    $body.animate({
                        scrollTop: 0
                    });
                    $wave.addClass('is-exiting');
                    smoothState.restartCSSAnimations();
                }
            }//,
            // onEnd: {
            //     duration: 0,
            //     render: function (url, $container, $content) {
            //         $wave.removeClass('is-exiting');
            //         $wave.html($content);
            //         $body.css('cursor', 'auto');
            //         $body.find('a').css('cursor', 'auto');
            //     }
            // }
        },
        smoothState = $wave.smoothState(options).data('smoothState');
})(jQuery);