class ScrollixBlock {
  constructor({ element, index, scrollable = true, makeStructure = true }) {
    if(!element || (index === undefined)) return;

    this.element = $( element ).get(0);
    this.index = index;
    this.start = Math.floor($( element ).offset().top);

    if(makeStructure) this.makeStructure();
    const innerH = $( element ).children().first().innerHeight() + 70;
    this.scrollable = (innerH > this.getMaxHeight()) ? false : scrollable;
    if(!this.scrollable) this.destroyStructure();
  }

  update() {
    const newStart = Math.floor($( this.element ).offset().top);
    this.start = newStart;
    this.scrollable = $( this.element ).outerHeight() > this.getMaxHeight() ? false : this.scrollable;
    return this;
  }

  makeStructure() {
    if($( this.element ).children().length > 1) {
      const $children = $( this.element ).children();
      const wrapper = document.createElement('div');
      wrapper.className = 'scrollable__wrapper';
      $children.appendTo(wrapper);

            $( this.element ).append(wrapper);

          } else {
            $( this.element ).children().first().addClass('scrollable__wrapper');
          }
    $( this.element ).addClass('scrollable');
  }

  destroyStructure() {
    $( this.element ).children().first().removeClass('scrollable__wrapper');
    $( this.element ).removeClass('scrollable');
  }

  getMaxHeight() {
    return window.innerHeight;
  }

  isScrollable() {
    return this.scrollable;
  }

  getStart() {
    return this.start;
  }

  getElement() {
    return this.element;
  }
}
