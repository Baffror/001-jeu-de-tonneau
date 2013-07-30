window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000/30);
            };

    // apply to our window global to avoid illegal invocations (it's a native)
    return function (callback, element) {
        func.apply(window, [callback, element]);
    };
})();