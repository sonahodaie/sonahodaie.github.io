(function($) {
  $.fn.hashchange = function(fn) {
    $(window).bind("jQuery.hashchange", fn);
    return this;
  };

  $.observeHashChange = function(options) {
    var opts = $.extend({}, $.observeHashChange.defaults, options);
    if (isHashChangeEventSupported()) {
      nativeVersion();
    }
    else {
      setIntervalVersion(opts);
    }
  };

  var locationHash = null;
  var functionStore = null;
  var interval = 0;

  $.observeHashChange.defaults = {
    interval : 500
  };

  function isHashChangeEventSupported() {
    return "onhashchange" in window;
  }

  function nativeVersion() {
    locationHash = document.location.hash;
    window.onhashchange = onhashchangeHandler;
  }

  function onhashchangeHandler(e, data) {
    var oldHash = locationHash;
    locationHash = document.location.hash;
    $(window).trigger("jQuery.hashchange", {before: oldHash, after: locationHash});
  }

  function setIntervalVersion(opts) {
    if (locationHash == null) {
      locationHash = document.location.hash;
    }
    if (functionStore != null) {
      clearInterval(functionStore);
    }
    if (interval != opts.interval) {
      functionStore = setInterval(checkLocationHash, opts.interval);
      interval = opts.interval;
    }
  }

  function checkLocationHash() {
    if (locationHash != document.location.hash) {
      var oldHash = locationHash;
      locationHash = document.location.hash;
      $(window).trigger("jQuery.hashchange", {before: oldHash, after: locationHash});
    }
  }

  $.observeHashChange();
})(jQuery);