class SmoothScrolling {
  constructor(elements) {
    this.offsetHeight = 80;

    if(!elements) return;
    if(this.getAnchor()) this.jumpOnLoad();

    this.setListners(elements);
  }

  jumpOnLoad() {
    const offset = this.getAnchorOffset() - this.getFixedOffset();

    $( document ).ready(() => window.scrollTo(window.pageXOffset, offset));
  }

  getFixedOffset() {
    return this.offsetHeight;
  }

  getAnchorOffset(el) {
    const elem = el || document.getElementById(this.getAnchor());

    return $( elem ).offset().top;
  }

  getAnchor(el) {
    if(!el) {
      const anchor = window.location.hash.slice(1);

      return !!(anchor) ? anchor : false;
    }

    const hash = el.has ? el.hash.slice(1) : false;

    return hash ? document.getElementById(hash) : false;
  }

  setListners(elements) {

    elements.forEach(el => {
      const $el = $( el );
      const fn = this.getListner(el);

      $el.on('click', fn)
    });
  }

  getListner(el) {
    return (ev) => {
      ev.preventDefault();

      const target = this.getAnchor(el);
      if(!target) return;
      
      const offset = this.getAnchorOffset(target);

      $("html, body").animate({ scrollTop: offset - this.getFixedOffset() }, 500);
    };
  }
}

const elements = $('[data-smooth-scroll="true"]').get();
new SmoothScrolling(elements);
