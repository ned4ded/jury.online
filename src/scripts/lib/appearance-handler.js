const appearanceHandler = (ev, height) => {
  const animated = $('[data-appearance]');
  const scrollBottom = () => $( window ).scrollTop() + $( window ).innerHeight();
  const curHeight = height || (scrollBottom() + 150);

  animated.each((i, element) => {
    const e = $( element );
    if(e.hasClass('appearance') || e.offset().top > (curHeight)) return;
    e.addClass('appearance');

    const delay = e.data('appearanceDelay') || null;
    if(e.data('appearanceCustom')) {
      const [ ...properties ] = e.data('appearanceCustom').split(',');

      var progressTarget;

      const object = properties.reduce((acc, p) => {
        const [name, value] = p.split(':');
        if(name == 'progress') {
          progressTarget = value;
          acc.percent = 100;
          return acc;
        }
        acc[name] = value;
        return acc;
      }, {});

      const animate = (obj, progress) => e.delay(delay || 1000).animate(obj, { duration: 700, progress});

      return progressTarget ? animate(object, (promise, remaining) => {
        const percent = (e.data('percent') * remaining).toFixed(0)
        $(`#${progressTarget}`).text(percent);
      }) : animate(object);
    }
    if(delay) e.attr('style', `animation-delay: ${delay}`);

    const typeName = e.data('appearanceType') || 'default';
    e.addClass(`appearance--${typeName}`);
  });
}
