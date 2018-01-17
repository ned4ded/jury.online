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
  const add = () => $('#header').addClass('header__bg');
  const remove = () =>  $('#header').removeClass('header__bg');

  $(document).ready(() => {
    if($(window).scrollTop() <= 0) remove();
  });

  $(window).scroll((ev) => {
    if($(window).scrollTop()) {
      add();
    } else {
      remove();
    };
  });

  $('#menu-toggler').on('click', () => {
    if($(window).scrollTop()) return;
    if($('#menu-toggler').attr('aria-expanded') === 'false') return add();
    return setTimeout(() => remove(), 300);
  });
}());
