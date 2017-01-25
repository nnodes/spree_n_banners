var vimeo_carousel = function() {
  var iframes = $('iframe[id*="player_"');
  var first_video = false
  $.each(iframes, function(i, iframe) {
    iframe.addEventListener('load', function(){
      var player = $f(iframe),
          status = $('.status');
      player.api('setVolume', 0);
      player.addEvent('finish', function(event) {
        $('#carousel-banner').carousel({interval: 5000});
        $('#carousel-banner').carousel('next');
      });
      //quitar intervalo
      player.addEvent('play', function(event) {
        $('#carousel-banner').carousel('pause');
      });
      
      //al pausar vuelve a tener intervalo
      player.addEvent('pause', function(event) {
        $('#carousel-banner').carousel({interval: 5000});
      });
      if ($(iframe).data('index') == 1){
        player.api('play');
      }
    });
  });
};

var ytplayer;
function onYouTubeIframeAPIReady() {
  ytplayer = new YT.Player("youtube-player", {
    height: "100%",
    width: "100%",
    playerVars: {'controls': 0, 
    'rel': 0,
    'showinfo': 0,
    'fs': 0},
    videoId: $("#youtube-player").data("videoid"),
    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.mute();
  var iframes = $('iframe[id*="youtube-player"');
  $.each(iframes, function(i, iframe) {
    iframe.addEventListener('load', function(){
      if ($(iframe).data('index') == 1){
        ytplayer.playVideo();
      }
    });
  });
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    $('#carousel-banner').carousel('pause');
  } else if(event.data == YT.PlayerState.PAUSED){
    $('#carousel-banner').carousel({interval: 5000});
  } else if (event.data == YT.PlayerState.ENDED){
    $('#carousel-banner').carousel({interval: 5000});
    $('#carousel-banner').carousel('next');
  }
}

function stopVideo() {
  ytplayer.stopVideo();
}

function loadScript() {
  var tag = document.createElement('script');
  tag.type = 'text/javascript';
  tag.setAttribute('id', 'youtube-player-iframe');
  tag.src = "https://www.youtube.com/iframe_api";
  $('#youtube-player').append(tag);
  var firstScriptTag = $('#youtube-player-iframe')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function youtube_carousel(){
  loadScript();
}

$(document).ready(function(){
  vimeo_carousel();
  if($('#youtube-player').length > 0){
    youtube_carousel();  
  }
  $('#carousel-banner').bind('slid.bs.carousel', function (e) {
    $.each($('iframe[id*="player_"'), function(i, iframe) {
      var player = $f(iframe),
          status = $('.status');
      if ($(this).parent().parent().hasClass('active')){
        player.api('play');
      } else {
        player.api('pause');
      }
    });
    $.each($('iframe[id*="youtube-player"'), function(i, iframe){
      if ($(this).parent().parent().hasClass('active')){
        ytplayer.playVideo();
      } else {
        ytplayer.stopVideo();
      }

    });
  });
});

// Init style shamelessly stolen from jQuery http://jquery.com
var Froogaloop = (function(){
    // Define a local copy of Froogaloop
    function Froogaloop(iframe) {
        // The Froogaloop object is actually just the init constructor
        return new Froogaloop.fn.init(iframe);
    }

    var eventCallbacks = {},
        hasWindowEvent = false,
        isReady = false,
        slice = Array.prototype.slice,
        playerOrigin = '*';

    Froogaloop.fn = Froogaloop.prototype = {
        element: null,

        init: function(iframe) {
            if (typeof iframe === "string") {
                iframe = document.getElementById(iframe);
            }

            this.element = iframe;

            return this;
        },

        /*
         * Calls a function to act upon the player.
         *
         * @param {string} method The name of the Javascript API method to call. Eg: 'play'.
         * @param {Array|Function} valueOrCallback params Array of parameters to pass when calling an API method
         *                                or callback function when the method returns a value.
         */
        api: function(method, valueOrCallback) {
            if (!this.element || !method) {
                return false;
            }

            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null,
                params = !isFunction(valueOrCallback) ? valueOrCallback : null,
                callback = isFunction(valueOrCallback) ? valueOrCallback : null;

            // Store the callback for get functions
            if (callback) {
                storeCallback(method, callback, target_id);
            }

            postMessage(method, params, element);
            return self;
        },

        /*
         * Registers an event listener and a callback function that gets called when the event fires.
         *
         * @param eventName (String): Name of the event to listen for.
         * @param callback (Function): Function that should be called when the event fires.
         */
        addEvent: function(eventName, callback) {
            if (!this.element) {
                return false;
            }

            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null;


            storeCallback(eventName, callback, target_id);

            // The ready event is not registered via postMessage. It fires regardless.
            if (eventName != 'ready') {
                postMessage('addEventListener', eventName, element);
            }
            else if (eventName == 'ready' && isReady) {
                callback.call(null, target_id);
            }

            return self;
        },

        /*
         * Unregisters an event listener that gets called when the event fires.
         *
         * @param eventName (String): Name of the event to stop listening for.
         */
        removeEvent: function(eventName) {
            if (!this.element) {
                return false;
            }

            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null,
                removed = removeCallback(eventName, target_id);

            // The ready event is not registered
            if (eventName != 'ready' && removed) {
                postMessage('removeEventListener', eventName, element);
            }
        }
    };

    /**
     * Handles posting a message to the parent window.
     *
     * @param method (String): name of the method to call inside the player. For api calls
     * this is the name of the api method (api_play or api_pause) while for events this method
     * is api_addEventListener.
     * @param params (Object or Array): List of parameters to submit to the method. Can be either
     * a single param or an array list of parameters.
     * @param target (HTMLElement): Target iframe to post the message to.
     */
    function postMessage(method, params, target) {
        if (!target.contentWindow.postMessage) {
            return false;
        }

        var data = JSON.stringify({
            method: method,
            value: params
        });

        target.contentWindow.postMessage(data, playerOrigin);
    }

    /**
     * Event that fires whenever the window receives a message from its parent
     * via window.postMessage.
     */
    function onMessageReceived(event) {
        var data, method;

        try {
            data = JSON.parse(event.data);
            method = data.event || data.method;
        }
        catch(e)  {
            //fail silently... like a ninja!
        }

        if (method == 'ready' && !isReady) {
            isReady = true;
        }

        // Handles messages from the vimeo player only
        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
            return false;
        }

        if (playerOrigin === '*') {
            playerOrigin = event.origin;
        }

        var value = data.value,
            eventData = data.data,
            target_id = target_id === '' ? null : data.player_id,

            callback = getCallback(method, target_id),
            params = [];

        if (!callback) {
            return false;
        }

        if (value !== undefined) {
            params.push(value);
        }

        if (eventData) {
            params.push(eventData);
        }

        if (target_id) {
            params.push(target_id);
        }

        return params.length > 0 ? callback.apply(null, params) : callback.call();
    }


    /**
     * Stores submitted callbacks for each iframe being tracked and each
     * event for that iframe.
     *
     * @param eventName (String): Name of the event. Eg. api_onPlay
     * @param callback (Function): Function that should get executed when the
     * event is fired.
     * @param target_id (String) [Optional]: If handling more than one iframe then
     * it stores the different callbacks for different iframes based on the iframe's
     * id.
     */
    function storeCallback(eventName, callback, target_id) {
        if (target_id) {
            if (!eventCallbacks[target_id]) {
                eventCallbacks[target_id] = {};
            }
            eventCallbacks[target_id][eventName] = callback;
        }
        else {
            eventCallbacks[eventName] = callback;
        }
    }

    /**
     * Retrieves stored callbacks.
     */
    function getCallback(eventName, target_id) {
        if (target_id) {
            return (eventCallbacks[target_id] || {})[eventName];
        }
        else {
            return eventCallbacks[eventName];
        }
    }

    function removeCallback(eventName, target_id) {
        if (target_id) {
            var targetCallbacks = eventCallbacks[target_id];
            if (!targetCallbacks || !targetCallbacks[eventName]) {
                return false;
            }
            targetCallbacks[eventName] = null;
        }
        else {
            if (!eventCallbacks[eventName]) {
                return false;
            }
            eventCallbacks[eventName] = null;
        }

        return true;
    }

    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    function isArray(obj) {
        return toString.call(obj) === '[object Array]';
    }

    // Give the init function the Froogaloop prototype for later instantiation
    Froogaloop.fn.init.prototype = Froogaloop.fn;

    // Listens for the message event.
    // W3C
    if (window.addEventListener) {
        window.addEventListener('message', onMessageReceived, false);
    }
    // IE
    else {
        window.attachEvent('onmessage', onMessageReceived);
    }

    // Expose froogaloop to the global object
    return (window.Froogaloop = window.$f = Froogaloop);

})();