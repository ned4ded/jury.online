'use strict';

(function () {
  var $container = $('#a-container');
  var $input = $('#a-input');
  var $suggestions = $('#a-list');
  if (!$container || !$input || !$suggestions) return;
  var duration = 500;

  var windowListner = function windowListner(ev) {
    var $clickedEl = $(ev.target).closest($container);

    if ($clickedEl.length !== 0) return;
    $(window).off('click', windowListner);
    $container.addClass('deactivating');

    setTimeout(function () {
      $container.removeClass('active').removeClass('deactivating');
      setTimeout(function () {
        return $container.on('click', inputListner);
      }, 0);
    }, duration);
  };

  var inputListner = function inputListner() {
    $container.off('click', inputListner);
    $container.addClass('activating');
    setTimeout(function () {
      $container.addClass('active').removeClass('activating');
      setTimeout(function () {
        return $(window).on('click', windowListner);
      }, 0);
    }, duration);
  };

  $.getJSON("assets/cities.json", function (json) {
    var parsed = json.map(function (object) {
      return { value: object['city'] };
    });

    $input.autocomplete({
      lookup: parsed,
      lookupLimit: 5,
      appendTo: $suggestions,
      width: '100%',
      zIndex: 1030,
      onSelect: function onSelect() {
        return $container.trigger("submit");
      }
    });
  });

  $container.on('click', inputListner);
})();
'use strict';

(function () {
  var $slider = $('#news-block-slider');
  var $newsCards = $slider.children();
  var $btn = function $btn(direction) {
    return $('#news-block-slider-btn-' + direction);
  };

  if ($newsCards.length >= 4) {
    $slider.removeClass('news-block__slider');
    $slider.slick({
      centerMode: true,
      slidesToShow: 3,
      arrows: false,
      dots: true,
      appendDots: $('.news-block__slider-dots'),
      variableWidth: true
    });

    $btn('left').click(function () {
      return $slider.slick('slickPrev');
    });
    $btn('right').click(function () {
      return $slider.slick('slickNext');
    });
  } else {
    $('.news-block__slider-btn').addClass('hidden-lg-up hidden-lg-down');
    $newsCards.addClass('active');
  }
})();

(function () {
  var $slider = $('#team-slider');
  var $btn = function $btn(direction) {
    return $('#team-slider-btn-' + direction);
  };

  $slider.removeClass('team__slider');
  $slider.slick({
    slidesToShow: 1,
    arrows: false,
    dots: false,
    infinit: true,
    speed: 1000,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 3
      }
    }]

  });

  $btn('left').click(function () {
    return $slider.slick('slickPrev');
  });
  $btn('right').click(function () {
    return $slider.slick('slickNext');
  });
})();
'use strict';

(function () {
  var deviceCheck = function deviceCheck() {
    if (!navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/webOS/i) && !navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPad/i) && !navigator.userAgent.match(/iPod/i) && !navigator.userAgent.match(/BlackBerry/i) && !navigator.userAgent.match(/Windows Phone/i)) {
      return true;
    } else {
      console.log('deviceCheck not passed');
      return false;
    }
  };

  var browserCheck = function browserCheck() {
    if (!/Edge\/\d./i.test(navigator.userAgent) && !/MSIE 10/i.test(navigator.userAgent) && !/rv:11.0/i.test(navigator.userAgent)) {
      return true;
    } else {
      console.log('browserCheck not passed');
      return false;
    }
  };

  var sizeCheck = function sizeCheck() {
    if (window.innerWidth >= 992 && window.innerHeight >= 650) {
      return true;
    } else {
      console.log('sizeCheck not passed');
      return false;
    }
  };

  var elements = function elements() {
    return $('[data-scrollable]');
  };

  $(document).ready(function () {
    $('html').removeClass('no-js');
  }());

  $(document).ready(function () {
    return new ScrollixBase(elements(), appearanceHandler,
    // deviceCheck() && browserCheck() && sizeCheck() && !!elements().length,
    false);
  });
})();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var appearanceHandler = function appearanceHandler(ev, height) {
  var animated = $('[data-appearance]');
  var scrollBottom = function scrollBottom() {
    return $(window).scrollTop() + $(window).innerHeight();
  };
  var curHeight = height || scrollBottom() + 150;

  animated.each(function (i, element) {
    var e = $(element);
    if (e.hasClass('appearance') || e.offset().top > curHeight) return;
    e.addClass('appearance');

    var delay = e.data('appearanceDelay') || null;
    if (e.data('appearanceCustom')) {
      var _e$data$split = e.data('appearanceCustom').split(','),
          _e$data$split2 = _toArray(_e$data$split),
          properties = _e$data$split2.slice(0);

      var progressTarget;

      var object = properties.reduce(function (acc, p) {
        var _p$split = p.split(':'),
            _p$split2 = _slicedToArray(_p$split, 2),
            name = _p$split2[0],
            value = _p$split2[1];

        if (name == 'progress') {
          progressTarget = value;
          acc.percent = 100;
          return acc;
        }
        acc[name] = value;
        return acc;
      }, {});

      var animate = function animate(obj, progress) {
        return e.delay(delay || 1000).animate(obj, { duration: 700, progress: progress });
      };

      return progressTarget ? animate(object, function (promise, remaining) {
        var percent = (e.data('percent') * remaining).toFixed(0);
        $('#' + progressTarget).text(percent);
      }) : animate(object);
    }
    if (delay) e.attr('style', 'animation-delay: ' + delay);

    var typeName = e.data('appearanceType') || 'default';
    e.addClass('appearance--' + typeName);
  });
};
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var classAdded = 'arbiter-form__docs-item--added';
  var $labels = $('[data-file-label]');
  var counters = $('[data-multiple-caption]').get();

  if ($labels.length === 0) return;

  var clear = function clear(e) {
    e.value = '';return;
  };
  var findById = function findById(arr, id) {
    return arr.find(function (e) {
      return e.id === id;
    });
  };
  var arr = $labels.get().reduce(function (acc, n) {
    var id = $(n).attr('for');
    var obj = { id: id, label: n, input: document.getElementById(id) };

    var counter = counters.find(function (e) {
      return $(e).attr('for') === id;
    });
    if (counter) obj.counter = counter;

    return id ? [].concat(_toConsumableArray(acc), [obj]) : acc;
  }, []);

  $(document).ready(function () {
    Array.from(document.getElementsByTagName('form')).forEach(function (n) {
      return n.reset();
    });

    arr.forEach(function (e) {
      var label = e.label,
          input = e.input,
          id = e.id,
          counter = e.counter;

      var $label = $(label);
      var $input = $(input);
      var $counter = $(counter);

      var block = function block(ev) {
        ev.preventDefault();
        clear(input);
        $label.unbind('click', block);
        $label.removeClass(classAdded);
      };

      $input.on('change', function (ev) {
        if (!$label.data('noCustomization')) {
          $label.addClass(classAdded);
          $label.click(block);
        } else if ($input.is('[multiple]')) {
          if (!counter) return;
          var pattern = $counter.data('multipleCaption');

          $counter.empty();

          input.files.length > 1 ? $counter.append(pattern.multi.replace('{counter}', input.files.length)) : $counter.append(pattern.single.replace('{counter}', 1));
        }
      });
    });
  });
})();
'use strict';

(function () {
  if ($('#header').is('[data-colored]')) return;

  var $add = function $add() {
    return $('#header').addClass('header__bg');
  };
  var $remove = function $remove() {
    return $('#header').removeClass('header__bg');
  };
  var $togglerState = function $togglerState() {
    return $('#menu-toggler').attr('aria-expanded') === 'true';
  };

  $(document).ready(function () {
    if ($(window).scrollTop() <= 0) $remove();
  });

  $(window).scroll(function () {
    if ($(window).scrollTop()) {
      $add();
    } else if (!$togglerState()) {
      $remove();
    }
    return;
  });

  $('#menu-toggler').on('click', function () {
    if ($(window).scrollTop()) return;
    if (!$togglerState()) return $add();
    return setTimeout(function () {
      return $remove();
    }, 300);
  });
})();
'use strict';

var Player;
var player = 'player-how-it-works';
var $player = $('#' + player);
var $container = $('#player-how-it-works-container');

function onYouTubeIframeAPIReady() {
  Player = new YT.Player(player, {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(ev) {
  $container.removeClass('video__playing');

  var playButton = document.getElementById('player-how-it-works-btn');
  $(playButton).click(function () {
    return Player.playVideo();
  });
};

function onPlayerStateChange(ev) {
  if (ev.data === YT.PlayerState.PAUSED || ev.data === YT.PlayerState.ENDED) {
    $container.removeClass('video__playing');
    $container.addClass('video__pausing');
    setTimeout(function () {
      $container.removeClass('video__pausing');
    }, 500);
  } else if (ev.data === YT.PlayerState.PLAYING) {
    $container.addClass('video__starting');
    setTimeout(function () {
      $container.removeClass('video__starting');
      $container.addClass('video__playing');
    }, 500);
  }
}

(function () {
  if (!$player) return;

  var scriptContainer = document.getElementById('async-container');
  var tag = document.createElement('script');
  var src = '//www.youtube.com/player_api';
  tag.src = src;
  $(scriptContainer).append($(tag));
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollixBase = function () {
  function ScrollixBase(elements, customHandler) {
    var makeStructure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, ScrollixBase);

    this.rootElements = elements;
    this.elements = this.loadElements(this.rootElements, makeStructure);
    this.events = new ScrollixEvents(this, customHandler);
    this.hasStructure = makeStructure;
    if (!makeStructure) this.events.clean();
    this.setBreakpoints();
    this.scrollTop = this.getScrollTop();
    this.scrollBottom = this.getScrollBottom();
    this.setScrollDirection(1);
    this.setNextIndex();
  }

  _createClass(ScrollixBase, [{
    key: 'getScrollTop',
    value: function getScrollTop() {
      return $(window).scrollTop();
    }
  }, {
    key: 'getScreenSize',
    value: function getScreenSize() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      return { width: width, height: height };
    }
  }, {
    key: 'getScrollBottom',
    value: function getScrollBottom() {
      return this.getScrollTop() + $(window).innerHeight();
    }
  }, {
    key: 'getNextElement',
    value: function getNextElement() {
      var _this = this;

      return this.elements.find(function (element) {
        return element.index === _this.nextIndex;
      });
    }
  }, {
    key: 'createBlock',
    value: function createBlock(element, index, makeStructure) {
      var scrollable = $(element).data('scrollable');

      return new ScrollixBlock({ index: index, element: element, scrollable: scrollable, makeStructure: makeStructure });
    }
  }, {
    key: 'loadElements',
    value: function loadElements(elements, makeStructure) {
      var _this2 = this;

      return elements.get().map(function (element, index) {
        return _this2.createBlock(element, index, makeStructure);
      });
    }
  }, {
    key: 'setBreakpoints',
    value: function setBreakpoints() {
      this.breakpoints = this.elements.map(function (element, index, array) {
        var start = element.getStart();
        var end = index < array.length - 1 ? array[index + 1].getStart() : $(document).innerHeight();
        return { index: index, start: start, end: end };
      });
    }
  }, {
    key: 'setNextIndex',
    value: function setNextIndex() {
      var _this3 = this;

      var curTop = this.scrollTop;
      var curBot = this.scrollBottom;
      var find = function find(fn) {
        return _this3.breakpoints.find(function (brp) {
          return fn(brp);
        });
      };

      var nextElement = this.scrollDirection ? find(function (brp) {
        return brp.end - curTop >= 0;
      }) : find(function (brp) {
        return brp.start - curBot >= 0;
      });

      var nextIndex = nextElement ? nextElement.index : this.elements.length - 1;
      this.nextIndex = nextIndex;

      return;
    }
  }, {
    key: 'updateElements',
    value: function updateElements() {
      this.elements = this.elements.slice().map(function (e) {
        return e.update();
      });
      return;
    }
  }, {
    key: 'setScrollProperties',
    value: function setScrollProperties(direction) {
      var top = this.getScrollTop();
      var bottom = this.getScrollBottom();

      this.setScrollDirection(direction || (this.scrollTop > top ? 1 : 0));

      this.scrollTop = top;
      this.scrollBottom = bottom;

      this.setNextIndex();

      return;
    }
  }, {
    key: 'setScrollDirection',
    value: function setScrollDirection(direction) {
      // top - 1, bottom - 0
      this.scrollDirection = direction;
    }
  }, {
    key: 'next',
    value: function next() {
      var _this4 = this;

      var element = this.elements.find(function (e) {
        return e.index === _this4.nextIndex;
      });

      $('html, body').animate({
        scrollTop: element.start - 60
      }, 1000);
    }
  }]);

  return ScrollixBase;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollixBlock = function () {
  function ScrollixBlock(_ref) {
    var element = _ref.element,
        index = _ref.index,
        _ref$scrollable = _ref.scrollable,
        scrollable = _ref$scrollable === undefined ? true : _ref$scrollable,
        _ref$makeStructure = _ref.makeStructure,
        makeStructure = _ref$makeStructure === undefined ? true : _ref$makeStructure;

    _classCallCheck(this, ScrollixBlock);

    if (!element || index === undefined) return;

    this.element = $(element).get(0);
    this.index = index;
    this.start = Math.floor($(element).offset().top);
    this.scrollable = $(element).outerHeight() > this.getMaxHeight() ? false : scrollable;

    if (makeStructure) this.makeStructure();
  }

  _createClass(ScrollixBlock, [{
    key: 'update',
    value: function update() {
      var newStart = Math.floor($(this.element).offset().top);
      this.start = newStart;
      this.scrollable = $(this.element).outerHeight() > this.getMaxHeight() ? false : this.scrollable;
      return this;
    }
  }, {
    key: 'makeStructure',
    value: function makeStructure() {
      if ($(this.element).children().length > 1) {
        var $children = $(this.element).children();
        var wrapper = document.createElement('div');
        wrapper.className = 'scrollable__wrapper';
        $children.appendTo(wrapper);

        $(this.element).append(wrapper);
      } else {
        $(this.element).children().first().addClass('scrollable__wrapper');
      }
      $(this.element).addClass('scrollable');
    }
  }, {
    key: 'getMaxHeight',
    value: function getMaxHeight() {
      return window.innerHeight;
    }
  }, {
    key: 'isScrollable',
    value: function isScrollable() {
      return this.scrollable;
    }
  }, {
    key: 'getStart',
    value: function getStart() {
      return this.start;
    }
  }]);

  return ScrollixBlock;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollixEvents = function () {
  function ScrollixEvents(base, customHandler) {
    var _this2 = this;

    _classCallCheck(this, ScrollixEvents);

    if (!(base instanceof ScrollixBase)) return;
    customHandler();

    this.base = base;
    this.customHandler = customHandler;

    $(window).scroll(function () {
      return _this2.scrollHandler();
    });
    this.setResizeListner();
    this.setWheelListner();
    this.setButtonsListner();
  }

  _createClass(ScrollixEvents, [{
    key: 'scrollHandler',
    value: function scrollHandler() {
      this.base.setScrollProperties();

      var h = this.base.getNextElement() ? this.base.getNextElement().end : this.base.scrollBottom + 150;
      this.customHandler(null, h);
      return;
    }
  }, {
    key: 'setResizeListner',
    value: function setResizeListner() {
      var _this3 = this;

      $(window).bind('resize', function () {
        var screen = _this3.base.getScreenSize();
        _this3.clean();
        if (screen.width < 992 || screen.height < 650 || !_this3.base.hasStructure) return;
        _this3.base.updateElements();
        _this3.base.setScrollProperties();
        _this3.base.setNextIndex();
        _this3.setWheelListner();
        _this3.setButtonsListner();
      });
    }
  }, {
    key: 'setWheelListner',
    value: function setWheelListner() {
      var _this4 = this;

      $(window).bind('wheel', function (e) {
        return _this4.wheelHandler(e);
      });
    }
  }, {
    key: 'setButtonsListner',
    value: function setButtonsListner() {
      var _this5 = this;

      var _this = this;
      $(window).bind('keydown', function (e) {
        return _this5.buttonsHandler(e);
      });
    }
  }, {
    key: 'wheelHandler',
    value: function wheelHandler(event) {
      // if(!this.base.getNextElement().isScrollable()) return console.log(this.base.elements);
      $(window).unbind('wheel');
      var block = function block(e) {
        return e.preventDefault();
      };
      $(window).bind('wheel', block);

      event.preventDefault();
      var dir = event.originalEvent.deltaY < 0 ? 1 : 0;
      this.base.setScrollDirection(dir);
      this.base.setNextIndex();
      this.base.next();

      var _this = this;

      var fn = function fn() {
        return _this.setScrollEndAsync(function () {
          $(window).unbind('scroll', fn);
          _this.base.setScrollProperties(dir);
          _this.base.setNextIndex();
          $(window).unbind('wheel', block);
          _this.setWheelListner();
          return;
        }, 100);
      };

      $(window).scroll(fn);
    }
  }, {
    key: 'buttonsHandler',
    value: function buttonsHandler(event) {
      var keys = { 'KeyW': 1, 'KeyS': 0, 'Space': 0, 'ArrowUp': 1, 'ArrowDown': 0 };
      var curKey = event.originalEvent.code;

      if (curKey === 'Escape') return this.clean();
      if (!Object.keys(keys).find(function (e) {
        return e === curKey;
      })) return;
      // if(!this.base.getNextElement().isScrollable()) return console.log(this.base.elements);
      event.preventDefault();

      $(window).unbind('keydown');
      var block = function block(e) {
        return e.preventDefault();
      };
      $(window).bind('keydown', block);

      var dir = keys[curKey];
      this.base.setScrollDirection(dir);
      this.base.setNextIndex();
      this.base.next();

      var _this = this;

      var fn = function fn() {
        return _this.setScrollEndAsync(function () {
          $(window).unbind('scroll', fn);
          _this.base.setScrollProperties(dir);
          _this.base.setNextIndex();
          $(window).unbind('keydown', block);
          _this.setButtonsListner();
          return;
        }, 100);
      };

      $(window).scroll(fn);
    }
  }, {
    key: 'setScrollEndAsync',
    value: function setScrollEndAsync(callback, timeout) {
      var $this = $(window);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback, timeout));
    }
  }, {
    key: 'clean',
    value: function clean() {
      $(window).unbind('wheel keydown');
      return;
    }
  }]);

  return ScrollixEvents;
}();