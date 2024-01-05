class PageScripts {

  constructor(){
    this.defaultPageTheme = 'ucdlib';
    this.pageTheme = this.defaultPageTheme;
  }

  init(){
    this.setPageTheme();
    console.log('PageScripts init', this.pageTheme);
  }

  setPageTheme(){
    const s = document.querySelector('#ucdlib-header-html-import');
    if ( !s || !s.src ) {
      this.pageTheme = this.defaultPageTheme;
      return;
    }
    if ( s.src.includes('datalab') ){
      this.pageTheme = 'datalab';
    } else {
      this.pageTheme = this.defaultPageTheme;
    }

  }
}

let instance = new PageScripts();

if( document.readyState === 'complete' ) {
  instance.init();
} else {
  window.addEventListener('load', () => {
    instance.init();
  });
}
