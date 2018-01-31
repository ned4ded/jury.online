var Player;
const player = 'player-how-it-works';
const $player = $('#' + player);
const $container = $('#player-how-it-works-container');

function onYouTubeIframeAPIReady() {
  Player = new YT.Player(player, {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(ev) {
  $container.removeClass('video__playing');

  const playButton = document.getElementById('player-how-it-works-btn');
  $(playButton).click(() => Player.playVideo());
};

function onPlayerStateChange(ev) {
  if(ev.data === YT.PlayerState.PAUSED || ev.data === YT.PlayerState.ENDED) {
    $container.removeClass('video__playing');
    $container.addClass('video__pausing');
    setTimeout(() => {
      $container.removeClass('video__pausing');
    }, 500);
  } else if (ev.data === YT.PlayerState.PLAYING) {
    $container.addClass('video__starting');
    setTimeout(() => {
      $container.removeClass('video__starting');
      $container.addClass('video__playing');
    }, 500);
  }
}

(function() {
  if(!$player) return;

  const scriptContainer = document.getElementById('async-container');
  const tag = document.createElement('script');
  const src = '//www.youtube.com/player_api';
  tag.src = src;
  $(scriptContainer).append($(tag));
}());
