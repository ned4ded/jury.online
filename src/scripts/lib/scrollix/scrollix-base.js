class ScrollixBase {
  constructor( elements = $('[data-scrollable]'), customHandler, makeStructure = true ) {
    if(!(elements instanceof jQuery)) return;

    this.rootElements = elements;
    this.elements = this.loadElements(this.rootElements, makeStructure);
    this.events = new ScrollixEvents(this, customHandler);
    if(!makeStructure) this.events.clean();
    this.setBreakpoints();
    this.scrollTop = this.getScrollTop();
    this.scrollBottom = this.getScrollBottom();
    this.setScrollDirection(1);
    this.setNextIndex();

  }

  getScrollTop() {
    return $( window ).scrollTop();
  }

  getScrollBottom() {
    return this.getScrollTop() + $( window ).innerHeight();
  }

  getNextElement() {
    return this.elements.find(element => element.index === this.nextIndex);
  }

  createBlock(element, index, makeStructure) {
    const scrollable = $( element ).data('scrollable');

    return new ScrollixBlock({ index, element, scrollable, makeStructure });
  }

  loadElements(elements, makeStructure) {
    return elements.get().map((element, index) => this.createBlock(element, index, makeStructure));
  }

  setBreakpoints() {
    this.breakpoints = this.elements.map((element, index, array) => {
      const start = element.getStart();
      const end = (index < array.length - 1) ? array[index + 1].getStart() : $( document ).innerHeight();
      return {index, start, end};
    });
  }

  setNextIndex() {
    const curTop = this.scrollTop;
    const curBot = this.scrollBottom;
    const find = (fn) => this.breakpoints.find(brp => fn(brp));

    const nextElement = this.scrollDirection ?
      find((brp) => (brp.end - curTop) >= 0) :
      find((brp) => (brp.start - curBot) >= 0);

    const nextIndex = nextElement ? nextElement.index : (this.elements.length - 1);
    this.nextIndex = nextIndex;

    return;
  }

  updateElements() {
    this.elements = this.elements.slice().map(e => e.update());
    return;
  }

  setScrollProperties(direction) {
    const top =  this.getScrollTop();
    const bottom = this.getScrollBottom();

    this.setScrollDirection(direction || (this.scrollTop > top ? 1 : 0));

    this.scrollTop = top;
    this.scrollBottom = bottom;

    this.setNextIndex();

    return;
  }

  setScrollDirection(direction) {
    // top - 1, bottom - 0
    this.scrollDirection = direction;
  }

  next() {
    const element = this.elements.find(e => e.index === this.nextIndex);

    $('html, body').animate({
               scrollTop: element.start - 60,
             }, 1000);
  }

}
