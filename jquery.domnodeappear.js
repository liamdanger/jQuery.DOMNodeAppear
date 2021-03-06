(function($) {
  $.fn.DOMNodeAppear = function(callback, selector) {

    var $this = $(this);

    selector = selector || (typeof $this.selector === 'function' && $this.selector);
    if (!selector) {
      console.log('Please update your calls to jQuery.DOMNodeAppear so that they explicitly pass the selector as a second argument after the callback.');
      return false;
    }

    var options = {
      keyframes: "@keyframes nodeInserted { from { opacity: 1; } to { opacity: 1; } } @-moz-keyframes nodeInserted { from { opacity: 1; } to { opacity: 1; } } @-webkit-keyframes nodeInserted { from { opacity: 1; } to { opacity: 1; } } @-ms-keyframes nodeInserted { from { opacity: 1; } to { opacity: 1; } } @-o-keyframes nodeInserted { from { opacity: 1; } to { opacity: 1; } }, ",
      selector: selector,
      stylesClass: selector.replace(".", ""),
      styles: selector + " { animation-name: nodeInserted; -webkit-animation-name: nodeInserted; animation-duration: 0.001s; -webkit-animation-duration: 0.001s; }"
    }

    // if the keyframes aren't present, add them in a style element
    if(!$("style.domnodeappear-keyframes").length) {
      $("head").append("<style class='domnodeappear-keyframes'>" + options.keyframes + "</style>");
    }

    // add animation to selected element
    $("head").append("<style class=\"" + options.stylesClass + "-animation\">" + options.styles + "</style>")

    // on animation start, execute the callback
    $(document).on('animationstart webkitAnimationStart oanimationstart MSAnimationStart', function(e){
      var self = $(e.target);
      if (e.originalEvent.animationName == 'nodeInserted' && self.is(options.selector)) {
        if (typeof callback == 'function') {
          callback.call(self);
        }
      }
    });

  };
  jQuery.fn.onAppear = jQuery.fn.DOMNodeAppear;
})(jQuery);
