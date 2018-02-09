(function() {
  const $photos = $('.team-block__photo, .team__element > .arbiter-card__photo');

  if($photos.length === 0) return;

  $photos.bind('contextmenu', function (e) {
    if(e.button == 2) {
      return false;
    }
  });
}());
