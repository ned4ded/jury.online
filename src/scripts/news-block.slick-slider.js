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
      appendDots: $('.news-block__slider-dots'),
      variableWidth: true,
      // dotsClass: 'news-block__slider-dots',
    });

    $btn('left').click(() => $slider.slick('slickPrev'));
    $btn('right').click(() => $slider.slick('slickNext'));

  } else {
    $('.news-block__slider-btn').addClass('hidden-lg-up hidden-lg-down');
    $newsCards.addClass('active');
  }
}());
