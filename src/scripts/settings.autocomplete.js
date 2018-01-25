(function() {
  const $container = $('#a-container');
  const $input = $('#a-input');
  const $suggestions = $('#a-list');
  if(!$container || !$input || !$suggestions) return;
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

  $.getJSON("assets/cities.json", function(json) {
    const parsed = json.map(object => {
      return { value: object['city'] }
    });

    $input.autocomplete({
      lookup: parsed,
      lookupLimit: 5,
      appendTo: $suggestions,
      width: '100%',
      zIndex: 1030,
      onSelect: () => $container.trigger("submit"),
    });
  });

  $container.on('click', inputListner);
}());
