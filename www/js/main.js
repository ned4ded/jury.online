// (function() {
//
//   }
//
//   $( document ).scroll(appearanceListner);
// }());
"use strict";
// (function() {
//   const $diagram = () => $('#fees-diagram');
//   const wholeW = $diagram().width();
//   const startW = (window.getComputedStyle(document.querySelector('#fees-diagram'), ':before').width).replace(/\D/g,'');
//   const finishW = 100 - (window.getComputedStyle(document.querySelector('#fees-diagram'), ':after').width) / wholeW;
//   const percent = Number($diagram().attr('data-complete-percent'));
//
//   return $(document).ready(() => {
//     console.log(startW + " " + finishW);
//     if(percent < (wholeW/startW)) {
//
//     }
//   });
// }());
"use strict";
'use strict';

(function () {
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

(function () {
  $('html').removeClass('no-js');
})();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

(function () {
  $(window).on("load", function () {
    var animated = $('[data-appearance]');

    var scrollBottom = function scrollBottom() {
      return $(window).scrollTop() + $(window).innerHeight();
    };

    var appearanceListner = function appearanceListner(ev, height) {
      var curHeight = height || scrollBottom() + 150;

      animated.each(function (i, element) {
        var e = $(element);
        if (e.hasClass('appearance') || e.offset().top > curHeight - 150) return;
        e.addClass('appearance');

        var delay = e.data('appearanceDelay') || null;
        if (e.data('appearanceCustom')) {
          var _e$data$split = e.data('appearanceCustom').split(','),
              _e$data$split2 = _toArray(_e$data$split),
              properties = _e$data$split2.slice(0);

          var object = properties.reduce(function (acc, p) {
            var _p$split = p.split(':'),
                _p$split2 = _slicedToArray(_p$split, 2),
                name = _p$split2[0],
                value = _p$split2[1];

            acc[name] = value;
            return acc;
          }, {});

          e.delay(delay || 1000).animate(object);

          return;
        }
        if (delay) e.attr('style', 'animation-delay: ' + delay);

        var typeName = e.data('appearanceType') || 'default';
        e.addClass('appearance--' + typeName);
      });
    };

    var scrolable = function scrolable() {
      var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      }

      function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
        }
      }

      function disableScroll() {
        if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault;
        window.onmousewheel = document.onmousewheel = preventDefault;
        window.ontouchmove = preventDefault;
        document.onkeydown = preventDefaultForScrollKeys;
      }

      function enableScroll() {
        if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
      }

      var $scrollArr = $('[data-scrollable]');
      if (!$('[data-scrollable]').length) return;
      var arr = [];
      $scrollArr.each(function (index, element) {
        arr.push({
          index: index,
          $element: $(element),
          begin: Math.floor($(element).offset().top),
          end: Math.floor($(element).outerHeight()) + Math.floor($(element).offset().top)
        });

        $(element).addClass('scrollable');

        if ($(element).children().length > 1) {
          var $children = $(element).children();
          var wrapper = document.createElement('div');
          wrapper.className = 'scrollable__wrapper';
          $children.appendTo(wrapper);

          $(element).append(wrapper);
        } else {
          $(element).children().first().addClass('scrollable__wrapper');
        }
      });

      var globalScrollTop = function globalScrollTop() {
        return $(document).scrollTop();
      };
      var headerHeight = $('header').outerHeight();
      var curElement = function curElement() {
        return arr.find(function (e) {
          return e.index === curElementIndex;
        });
      };
      var scrollEnd = function scrollEnd(callback, timeout) {
        $(document).scroll(function () {
          var $this = $(document);
          if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
          }
          $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
      };

      var lastScrollTop = 0;
      var curElementIndex = 0;

      var listner = function listner() {
        disableScroll();
        $(document).unbind('scroll', listner);

        var currentScrollTop = globalScrollTop();
        var isTopDirection = lastScrollTop > currentScrollTop ? true : false;

        if (isTopDirection) {
          if (curElementIndex === 0) return;
          curElementIndex = curElementIndex - 1;
        } else {
          if (curElementIndex === arr.length - 1) return;
          curElementIndex = curElementIndex + 1;
        }

        // if(!curElement().scrollable) console.log('FIND IT');

        $(document).unbind('scroll', listner);
        appearanceListner(null, curElement().end);

        $('html, body').animate({
          scrollTop: curElement().begin - headerHeight
        }, 1000);

        scrollEnd(function () {
          lastScrollTop = globalScrollTop();
          $(document).unbind('scroll', scrollEnd);
          $(document).scroll(listner);
          enableScroll();
        }, 100);
      };

      $(document).scroll(listner);
    };

    (function () {
      return document.scroll(0, 0)();
    });

    if (window.innerWidth >= 992 && window.innerHeight >= 850 && !navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/webOS/i) && !navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPad/i) && !navigator.userAgent.match(/iPod/i) && !navigator.userAgent.match(/BlackBerry/i) && !navigator.userAgent.match(/Windows Phone/i) && !/Edge\/\d./i.test(navigator.userAgent) && !/MSIE 10/i.test(navigator.userAgent) && !/rv:11.0/i.test(navigator.userAgent)) {
      scrolable();
    } else {
      if (animated.length) $(window).scroll(appearanceListner);
    }
  });
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
      // dotsClass: 'news-block__slider-dots',
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