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
