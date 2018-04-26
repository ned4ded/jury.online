(() => {
  const $carousel = $('#arbiters-block-carousel');
  if(!$carousel) return;

  const slidesCount = $carousel.find('.carousel-item').length;
  const randomizedSlide = Math.floor(Math.random() * slidesCount);

  return $carousel.carousel(randomizedSlide).carousel({ ride: true });
})();
