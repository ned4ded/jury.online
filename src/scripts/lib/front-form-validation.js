(function() {
  const form = document.getElementById('form-validation');
  const requiredElems = $( form ).find('input[required]').get();
  const requiredGroups = $( form ).find('input[data-required-group]')
    .get()
    .reduce((acc, e) => {
      const groups = Object.keys(acc);
      const curGroup = $( e ).data('requiredGroup');

      const hasGroup = groups.find(g => g === curGroup);

      acc[curGroup] = hasGroup ? [...acc[curGroup], e] : [e];

      return acc;
    }, {});

  const invalidClass = 'arbiter-form__required';
  const invalidGroupClass = 'arbiter-form__group-validation--active';

  const hasInvalid = (arr, fn) => {
    const invalidElems = arr.map(e => fn(e)).filter(e => e !== true);
    return invalidElems.length > 0 ? invalidElems : false;
  }

  const isValidGroup = (group, fn) => {
    const invalidElems = group.map(e => fn(e)).filter(e => e !== true);
    return invalidElems.length !== group.length ? true : false;
  }

  const hasFile = (i) => i.files.length > 0 ? true : false;

  const requireValidation = (e) => {
    const value = e.checkValidity();
    return value? true : e;
  }

  const removeGroupError = (ev, e, label) => {
    $(e).unbind('change', removeGroupError);
    $(label).removeClass(invalidGroupClass);
  }

  $( document ).ready(() => {
    $( form ).on('submit', (ev) => {
      ev.preventDefault();

      const invalidElems = hasInvalid(requiredElems, requireValidation);
      const invalidGroups = Object.keys(requiredGroups).map(key => {
        const group = requiredGroups[key];

        return isValidGroup(group, hasFile) ? true : {name: key, group};
      }).filter(e => e !== true);

      if(invalidElems === false && invalidGroups.length === 0) form.submit();

      if(invalidElems !== false) invalidElems.forEach(e => $( e ).addClass(invalidClass));

      const $first = invalidElems.length > 0 ? $( invalidElems[0] ) : $( invalidGroups[0].group[0] );

      if(invalidGroups.length !== 0) invalidGroups.forEach(g => {
        const name = g.name;
        const elems = g.group;
        const $label = $(`[data-for-group="${name}"]`);

        $label.addClass(invalidGroupClass);

        elems.forEach(e => {
          const cleanLabel = (ev) => removeGroupError(ev, e, $label);
          $( e ).on('change', cleanLabel);
        })
      });

      const height = $first.height();
      const windowHeight = window.innerHeight;
      const top = $first.offset().top || $first.parent().offset().top;
      const target = top - (windowHeight / 2) - (height / 2);

      $('html, body').animate({
          scrollTop: target,
        }, 1000, () => $first.focus());
    });
  });

}());
