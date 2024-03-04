import domUtils from "../utils/dom-utils.js";

/**
 * @description For any dom manipulation that needs to happen
 */
class PageScripts {

  init(){
    this.updateHeaderSearchDomain();
    this.changeFilterDropdownIcon();
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

  changeFilterDropdownIcon(){
    const icon = document.querySelector('#em-button-toggle-filter .fa-sliders-h');
    if ( !icon ) return;
    icon.classList.remove('fa-sliders-h');
    icon.classList.add('fa-filter');
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
