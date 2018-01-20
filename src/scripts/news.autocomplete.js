(function() {
  const $container = $('#a-container');
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

  // const input = document.getElementById("a-input");
  // new Awesomplete(input, {
  // 	list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"]
  //   minChars: 2,
  //   maxItems: 5,
  // });

  $container.on('click', inputListner);
}());
