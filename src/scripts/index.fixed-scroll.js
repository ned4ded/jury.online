// (function() {
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


      console.log('A LOT OF CHILDREN!')
    } else {
      console.log($( element ).children().first().addClass('scrollable__wrapper'));
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

  console.log(arr);

  const listner = function() {
    const currentScrollTop = globalScrollTop();
    const isTopDirection = lastScrollTop > currentScrollTop ? true : false;
    console.log(curElementIndex);

    if(isTopDirection) {
      console.log('top dir terminak');
      if(curElementIndex === 0) return console.log('returned');
      curElementIndex = curElementIndex - 1;
    } else {
      console.log('bottom dir terminal');
      if(curElementIndex === (arr.length - 1)) return console.log('returned');
      curElementIndex = curElementIndex + 1;
    }

    if(!curElement().scrollable) console.log('FIND IT');

    disableScroll();
    $( window ).unbind('scroll', listner);

    console.log(arr.find(e => e.index === curElementIndex).begin);

    $('html, body').animate({
         scrollTop: curElement().begin - headerHeight + 1,
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
// }());
