class ScrollixBlock {
  constructor({ element, index, scrollable = true, makeStructure = true }) {
    if(!element || (index === undefined)) return;

    this.element = $( element ).get(0);
    this.index = index;
    this.start = Math.floor($( element ).offset().top);
    this.scrollable = ($( element ).outerHeight() > this.getMaxHeight()) ? false : scrollable;

    if(makeStructure) this.makeStructure();


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

  getMaxHeight() {
    return window.innerHeight;
  }

  isScrollable() {
    return this.scrollable;
  }

  getStart() {
    return this.start;
  }
}
