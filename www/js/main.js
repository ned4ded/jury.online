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
  const $container = $('#a-container');
  const duration = 500;

  const windowListner = (ev) => {
    const $clickedEl = $(ev.target).closest($container);

    if($clickedEl.length !== 0) return;
    $( window ).off('click', windowListner);
    $container.addClass('deactivating');

    setTimeout(() => {
      $container.removeClass('active').removeClass('deactivating');
      setTimeout(() => $container.on('click', inputListner), 0);
    }, duration);
  }

  const inputListner = () => {
    $container.off('click', inputListner);
    $container.addClass('activating');
    setTimeout(() => {
      $container.addClass('active').removeClass('activating');
      setTimeout(() => $( window ).on('click', windowListner), 0);
    }, duration);
  }

  // const input = document.getElementById("a-input");
  // new Awesomplete(input, {
  // 	list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"]
  //   minChars: 2,
  //   maxItems: 5,
  // });

  $container.on('click', inputListner);
}());
