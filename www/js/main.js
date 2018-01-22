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
