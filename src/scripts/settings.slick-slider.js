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
    });

    $btn('left').click(() => $slider.slick('slickPrev'));
    $btn('right').click(() => $slider.slick('slickNext'));

  } else {
    $('.news-block__slider-btn').addClass('hidden-lg-up hidden-lg-down');
    $newsCards.addClass('active');
  }
}());

(function() {
  const $slider = $('#team-slider');
  const $btn = direction => $(`#team-slider-btn-${direction}`);


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
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      }
    ]


  });

  $btn('left').click(() => $slider.slick('slickPrev'));
  $btn('right').click(() => $slider.slick('slickNext'));
}());
