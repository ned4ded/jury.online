class ScrollixEvents {
  constructor(base, customHandler) {
    if(!(base instanceof ScrollixBase)) return;
    customHandler();

    this.base = base;
    this.customHandler = customHandler;

    $( window ).scroll(() => this.scrollHandler());
    this.setResizeListner();
    this.setWheelListner();
    this.setButtonsListner();
  }

  scrollHandler() {
    this.base.setScrollProperties();

    const h = this.base.getNextElement() ? this.base.getNextElement().end : this.base.scrollBottom + 150;
    this.customHandler(null,h);
    return;
  }

  setResizeListner() {
    $( window ).bind('resize', () => {
        const screen = this.base.getScreenSize();
        this.clean();
        if((screen.width < 992 || screen.height < 650) || !this.base.hasStructure) return;
        this.base.updateElements();
        this.base.setScrollProperties();
        this.base.setNextIndex();
        this.setWheelListner();
        this.setButtonsListner();
      });
  }

  setWheelListner() {
    $( window ).bind('wheel', (e) => this.wheelHandler(e));
  }

  setButtonsListner() {
    const _this = this;
    $( window ).bind('keydown', (e) => this.buttonsHandler(e));
  }

  wheelHandler(event) {
    const dir = (event.originalEvent.deltaY < 0) ? 1 : 0;
    this.base.setScrollDirection(dir);
    this.base.setNextIndex();
    if(!this.base.getNextElement().isScrollable()
    || this.base.getScrollBottom() == $( document ).height()
    || this.base.getScrollTop() == 0) return;
    $( window ).unbind('wheel');
    const block = e => e.preventDefault();
    $( window ).bind('wheel', block);

    event.preventDefault();
    this.base.next();

    const _this = this;

    const fn = () => _this.setScrollEndAsync(function(){
        $( window ).unbind('scroll', fn);
        _this.base.setScrollProperties(dir);
        _this.base.setNextIndex();
        $( window ).unbind('wheel', block);
        _this.setWheelListner();
        return;
      }, 100);

     $( window ).scroll(fn);
  }

  buttonsHandler(event) {
    const keys = { 'KeyW': 1, 'KeyS': 0, 'Space': 0, 'ArrowUp': 1, 'ArrowDown': 0 };
    const curKey = event.originalEvent.code;

    const dir = keys[curKey];
    this.base.setScrollDirection(dir);
    this.base.setNextIndex();

    if(curKey === 'Escape') return this.clean();
    if(!Object.keys(keys).find(e => e === curKey)) return;
    if(!this.base.getNextElement().isScrollable()
    || this.base.getScrollBottom() == $( document ).height()
    || this.base.getScrollTop() == 0) return;
    event.preventDefault();

    $( window ).unbind('keydown');
    const block = e => e.preventDefault();
    $( window ).bind('keydown', block);

    this.base.next();

    const _this = this;

    const fn = () => _this.setScrollEndAsync(function(){
        $( window ).unbind('scroll', fn);
        _this.base.setScrollProperties(dir);
        _this.base.setNextIndex();
        $( window ).unbind('keydown', block);
        _this.setButtonsListner();
        return;
      }, 100);

     $( window ).scroll(fn);
  }

  setScrollEndAsync (callback, timeout) {
    var $this = $( window );
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback, timeout));
  };

  clean() {
    $( window ).unbind('wheel keydown');
    return;
  }
}
