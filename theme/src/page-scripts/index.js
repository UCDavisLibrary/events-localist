import domUtils from "../dom-utils.js";

/**
 * @description For any dom manipulation that needs to happen
 */
class PageScripts {

  init(){
    this.updateHeaderSearchDomain();
  }

  /**
   * @description Update the header search form action to match the page theme
   * @returns
   */
  updateHeaderSearchDomain(){
    const searchEle = document.querySelector('ucd-theme-search-form');
    if ( !searchEle || !domUtils.getThemeDomain() ) return;

    searchEle.formAction = domUtils.getThemeDomain();
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
