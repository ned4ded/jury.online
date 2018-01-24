(function() {
  $( window ).on( "load", function() {
    const animated = $('[data-appearance]');

    const scrollBottom = () => $( window ).scrollTop() + $( window ).innerHeight();

    const appearanceListner = (ev, height) => {
      const curHeight = height || (scrollBottom() + 150);


      animated.each((i, element) => {
        const e = $( element );
        if(e.hasClass('appearance') || e.offset().top > (curHeight - 150)) return;
        e.addClass('appearance');

        const delay = e.data('appearanceDelay') || null;
        if(e.data('appearanceCustom')) {
          const [ ...properties ] = e.data('appearanceCustom').split(',');
          const object = properties.reduce((acc, p) => {
            const [name, value] = p.split(':');
            acc[name] = value;
            return acc;
          }, {});

          e.delay(delay || 1000).animate(object);

          return;
        }
        if(delay) e.attr('style', `animation-delay: ${delay}`);

        const typeName = e.data('appearanceType') || 'default';
        e.addClass(`appearance--${typeName}`);
      });
    }

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
        if (window.addEventListener)
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault;
        window.onmousewheel = document.onmousewheel = preventDefault;
        window.ontouchmove  = preventDefault;
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
      const arr = [];
      $scrollArr.each((index, element) => {
        arr.push({
          index,
          $element: $( element ),
          begin: Math.floor($( element ).offset().top),
          end: Math.floor($( element ).outerHeight()) + Math.floor($( element ).offset().top),
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

      const globalScrollTop = () => $( document ).scrollTop();
      const headerHeight = $('header').outerHeight();
      const curElement = () => arr.find(e => e.index === curElementIndex);
      const scrollEnd = function(callback, timeout) {
        $( document ).scroll(function(){
          var $this = $( document );
          if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
          }
          $this.data('scrollTimeout', setTimeout(callback,timeout));
        });
      };

      var lastScrollTop = 0;
      var curElementIndex = 0;

      const listner = function() {
        disableScroll();
        $( document ).unbind('scroll', listner);

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

        $( document ).unbind('scroll', listner);
        appearanceListner(null, curElement().end);

        $('html, body').animate({
             scrollTop: curElement().begin - headerHeight,
           }, 1000);


        scrollEnd(function(){
          lastScrollTop = globalScrollTop();
          $( document ).unbind('scroll', scrollEnd);
          $( document ).scroll(listner);
          enableScroll();
        }, 100);
      }

      $( document ).scroll(listner);
    };

    (() => document.scroll(0, 0)());

    if(window.innerWidth >= 992
     && window.innerHeight >= 850
     && !navigator.userAgent.match(/Android/i)
     && !navigator.userAgent.match(/webOS/i)
     && !navigator.userAgent.match(/iPhone/i)
     && !navigator.userAgent.match(/iPad/i)
     && !navigator.userAgent.match(/iPod/i)
     && !navigator.userAgent.match(/BlackBerry/i)
     && !navigator.userAgent.match(/Windows Phone/i)
     && !(/Edge\/\d./i.test(navigator.userAgent))
     && !(/MSIE 10/i.test(navigator.userAgent))
     && !(/rv:11.0/i.test(navigator.userAgent))
     ){
        scrolable();
      } else {
        if(animated.length) $( window ).scroll(appearanceListner);
      }
  });
}());
