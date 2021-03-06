(function() {
  const deviceCheck = () => {
    if(!navigator.userAgent.match(/Android/i)
    && !navigator.userAgent.match(/webOS/i)
    && !navigator.userAgent.match(/iPhone/i)
    && !navigator.userAgent.match(/iPad/i)
    && !navigator.userAgent.match(/iPod/i)
    && !navigator.userAgent.match(/BlackBerry/i)
    && !navigator.userAgent.match(/Windows Phone/i)) {
      return true;
    } else {
      console.log('deviceCheck not passed');
      return false;
    }
  };

  const browserCheck = () => {
    if(!(/Edge\/\d./i.test(navigator.userAgent))
    && !(/MSIE 10/i.test(navigator.userAgent))
    && !(/rv:11.0/i.test(navigator.userAgent))) {
      return true;
    } else {
      console.log('browserCheck not passed');
      return false;
    }
  }

  const sizeCheck = () => {
      if(window.innerWidth >= 992
      && window.innerHeight >= 650) {
        return true;
      } else {
        console.log('sizeCheck not passed');
        return false;
      }
  }

  const elements = () => $('[data-scrollable]');

  $( document ).ready(() => new ScrollixBase(
      elements(),
      appearanceHandler,
      // deviceCheck() && browserCheck() && sizeCheck() && !!elements().length,
      false,
    ));

  $( document ).ready(function() {
    $('html').removeClass('no-js');
    const elements = $('[data-smooth-scroll="true"]').get();

    return () => new SmoothScrolling(elements);
  }());
}());
