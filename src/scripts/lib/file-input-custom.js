(function() {
  const classAdded = 'arbiter-form__docs-item--added';
  const $labels = $('[data-file-label]');
  const counters = $('[data-multiple-caption]').get();

  if($labels.length === 0) return;

  const clear = e => { e.value = ''; return;};
  const findById = (arr, id) => arr.find(e => e.id === id);
  const arr = $labels.get().reduce((acc, n) => {
    const id = $(n).attr('for');
    const obj = { id, label: n, input: document.getElementById(id) };

    const counter = counters.find(e => $(e).attr('for') === id);
    if(counter) obj.counter = counter;

    return id ?
    [ ...acc,  obj] :
    acc;
  }, []);



  $( document ).ready(() => {
    Array.from(document.getElementsByTagName('form')).forEach(n => n.reset());

    arr.forEach(e => {
      const { label, input, id, counter } = e;
      const $label = $( label );
      const $input = $( input );
      const $counter = $( counter );

      const block = (ev) => {
        ev.preventDefault();
        clear(input);
        $label.unbind('click', block);
        $label.removeClass(classAdded);
      };

      $input.on('change', (ev) => {
        if(!$label.data('noCustomization')) {
          $label.addClass(classAdded);
          $label.click(block);
        } else if($input.is('[multiple]')) {
          if(!counter) return;
          const pattern = $counter.data('multipleCaption');

          $counter.empty();

          (input.files.length > 1) ?
          $counter.append(pattern.multi.replace('{counter}', input.files.length)) :
          $counter.append(pattern.single.replace('{counter}', 1));
        }
      });
    });
  });
}());
