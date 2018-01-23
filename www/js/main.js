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

(function() {
  const $add = () => $('#header').addClass('header__bg');
  const $remove = () =>  $('#header').removeClass('header__bg');
  const $togglerState = () => ($('#menu-toggler').attr('aria-expanded') === 'true');

  $(document).ready(() => {
    if($(window).scrollTop() <= 0) $remove();
  });

  $(window).scroll(() => {
    if($(window).scrollTop()) {
      $add();
    } else if (!$togglerState()) {
      $remove();
    }
    return;
  });

  $('#menu-toggler').on('click', () => {
    if($(window).scrollTop()) return;
    if(!$togglerState()) return $add();
    return setTimeout(() => $remove(), 300);
  });
}());

(function() {
  $('html').removeClass('no-js');
}());

const scrolable = function() {
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }

  const $scrollArr = $('[data-scrollable]');
  if(!$('[data-scrollable]').length) return;

  const globalScrollTop = () => $( document ).scrollTop();
  const headerHeight = $('header').outerHeight();
  const arr = [];


  $scrollArr.each((index, element) => {
    arr.push({
      index,
      $element: $( element ),
      begin: Math.floor($( element ).offset().top),
      end: Math.floor($( element ).outerHeight()) + Math.floor($( element ).offset().top),
      scrollable: $( element ).data('scrollable'),
    });

    $( element ).addClass('scrollable');

    if($( element ).children().length > 1) {
      const $children = $( element ).children();
      const wrapper = document.createElement('div');
      wrapper.className = 'scrollable__wrapper';
      $children.appendTo(wrapper);

      $( element ).append(wrapper);

    } else {
      $( element ).children().first().addClass('scrollable__wrapper');
    }
  });

  var lastScrollTop = 0;
  var curElementIndex = 0;
  const curElement = () => arr.find(e => e.index === curElementIndex);

  const scrollEnd = function(callback, timeout) {
    $( window ).scroll(function(){
      var $this = $( window );
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
  };


  const listner = function() {
    const currentScrollTop = globalScrollTop();
    const isTopDirection = lastScrollTop > currentScrollTop ? true : false;

    if(isTopDirection) {
      if(curElementIndex === 0) return;
      curElementIndex = curElementIndex - 1;
    } else {
      if(curElementIndex === (arr.length - 1)) return;
      curElementIndex = curElementIndex + 1;
    }

    // if(!curElement().scrollable) console.log('FIND IT');

    disableScroll();
    $( window ).unbind('scroll', listner);

    $('html, body').animate({
         scrollTop: curElement().begin - headerHeight,
       }, 1000);


    scrollEnd(function(){
      lastScrollTop = globalScrollTop();
      $( window ).unbind('scroll', scrollEnd);
      enableScroll();
      $( window ).scroll(listner);
    }, 45);
  }

  $( document ).ready(() => window.scroll(0, 0));

  $( window ).on( "load", function() {
    $( window ).scroll(listner);
  });
};

if(window.innerWidth >= 992 && window.innerHeight >= 1024) {
 if( !navigator.userAgent.match(/Android/i)
 || !navigator.userAgent.match(/webOS/i)
 || !navigator.userAgent.match(/iPhone/i)
 || !navigator.userAgent.match(/iPad/i)
 || !navigator.userAgent.match(/iPod/i)
 || !navigator.userAgent.match(/BlackBerry/i)
 || !navigator.userAgent.match(/Windows Phone/i)
 ){
    scrolable();
  }
}

(function() {
  const $slider = $('#news-block-slider');
  const $newsCards = $slider.children();
  const $btn = direction => $(`#news-block-slider-btn-${direction}`);

  if($newsCards.length >= 4) {
    $slider.removeClass('news-block__slider');
    $slider.slick({
      centerMode: true,
      slidesToShow: 3,
      arrows: false,
      dots: true,
      appendDots: $('.slick-slider'),
      variableWidth: true,
      dotsClass: 'news-block__slider-dots'
    });

    $btn('left').click(() => $slider.slick('slickPrev'));
    $btn('right').click(() => $slider.slick('slickNext'));

  } else {
    $('.news-block__slider-btn').addClass('hidden-lg-up hidden-lg-down');
    $newsCards.addClass('active');
  }
}());
