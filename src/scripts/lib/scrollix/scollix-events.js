class ScrollixEvents {
  constructor(base, customHandler) {
    if(!(base instanceof ScrollixBase)) return;

    this.base = base;
    this.customHandler = customHandler;

    const _this = this;

    $( window ).scroll(() => this.scrollHandler());
    this.setWheelListner();
    this.setButtonsListner();
  }

  scrollHandler() {
    this.base.setScrollProperties();
    this.customHandler(null, this.base.getNextElement().end);
    return;
  }

  setWheelListner() {
    const _this = this;
    $( window ).bind('wheel', (e) => this.wheelHandler(e));
  }

  setButtonsListner() {
    const _this = this;
    $( window ).bind('keydown', (e) => this.buttonsHandler(e));
  }

  wheelHandler(event) {
    // if(!this.base.getNextElement().isScrollable()) return console.log(this.base.elements);
    $( window ).unbind('wheel');
    const block = e => e.preventDefault();
    $( window ).bind('wheel', block);

    event.preventDefault();
    const dir = (event.originalEvent.deltaY < 0) ? 1 : 0;
    this.base.setScrollDirection(dir);
    this.base.setNextIndex();
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

    if(curKey === 'Escape') return this.clean();
    if(!Object.keys(keys).find(e => e === curKey)) return;
    // if(!this.base.getNextElement().isScrollable()) return console.log(this.base.elements);
    event.preventDefault();

    $( window ).unbind('keydown');
    const block = e => e.preventDefault();
    $( window ).bind('keydown', block);

    const dir = keys[curKey];
    this.base.setScrollDirection(dir);
    this.base.setNextIndex();
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
