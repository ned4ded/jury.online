(function() {
  if($('#header').is('[data-colored]')) return;

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
