(function() {
  const $container = $('#a-container');
  const $input = $('#a-input');
  const $suggestions = $('#a-list');
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

  const testList = [
    { value: 'Category1', data: 'Ct1' },
    { value: 'Category2', data: 'Ct2' },
    { value: 'Category3', data: 'Ct3' },
    { value: 'Category4', data: 'Ct4' },
    { value: 'Category5', data: 'Ct5' },
  ]

  $input.autocomplete({
    lookup: testList,
    appendTo: $suggestions,
    zIndex: 1030,
    autoSelectFirst: true,
    onSelect: () => $container.trigger("submit"),
});

  $container.on('click', inputListner);
}());
