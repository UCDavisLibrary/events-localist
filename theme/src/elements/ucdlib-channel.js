import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-channel.tpl.js";

import "./ucdlib-page-title.js";

/**
 * @class UcdlibChannel
 * @description A custom element for arranging and inserting branded page content on a localist channel/calendar page
 * @slot main-content - The main content of the page
 * @slot sidebar - The sidebar content of the page
 * @property {String} pageTitle - The title of the page
 */
export default class UcdlibChannel extends LitElement {

  static get properties() {
    return {
      pageTitle: {type: String, attribute: 'page-title'},
      selfMoved: {state: true}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.pageTitle = '';

    // connected callback is our init hook
    // and it will be called again after the element is moved
    // don't want to init twice
    this.selfMoved = false;
  }

  connectedCallback(){
    super.connectedCallback();
    this.init();
  }

  init(){
    this.moveSelfBeforeMainContent();
    if ( !this.selfMoved ) {
      this.makeColumns();
      this.insertPageTitle();
      this.insertDateRangeHeader();
    }
  }

  /**
   * @description Inserts branded page title into light dom above breadcrumbs
   * @returns {boolean} true if the page title was inserted
   */
  insertPageTitle(){
    if ( !this.pageTitle ) return;
    const breadcrumbs = document.querySelector('ucdlib-breadcrumbs');
    if( !breadcrumbs ) {
      console.warn('Could not find breadcrumbs element. Not inserting page title');
      return;
    }
    const pageTitle = document.createElement('ucdlib-page-title');
    pageTitle.setAttribute('page-title', this.pageTitle);
    breadcrumbs.before(pageTitle);
    this.pageTitleInserted = true;
    return true;
  }

  insertDateRangeHeader(){
    const labelEle = document.querySelector('.em-filter-header');
    const label = labelEle ? labelEle.textContent.trim() : '';
    const prevEle = document.querySelector('.em-navigation-previous');
    const prevLink = prevEle ? prevEle.getAttribute('href') : '';
    const nextEle = document.querySelector('.em-navigation-next');
    const nextLink = nextEle ? nextEle.getAttribute('href') : '';

    // insert as first child of em-filter-wrapper
    if ( !label || !prevLink || !nextLink ) return;
    const dateRangeHeader = document.createElement('ucdlib-date-range');
    dateRangeHeader.setAttribute('label', label);
    dateRangeHeader.setAttribute('prev-link', prevLink);
    dateRangeHeader.setAttribute('next-link', nextLink);
    const filterWrapper = document.querySelector('.em-filter-wrapper');
    if ( !filterWrapper ) {
      console.warn('Could not find filter wrapper element. Not inserting date range header');
      return;
    }
    filterWrapper.prepend(dateRangeHeader);
  }

  /**
   * @description Rearranges the content of the page into two columns
   * Anything with the 'ucdlib-sidebar' class in the page content section will be moved to the sidebar
   */
  makeColumns(){
    this.slotInMainContent();
    this.moveElementsToSidebar();
  }

  /**
   * @description Move this element just before the main content element
   * Since sometimes we can't control exactly where this element is placed in the Localist UI.
   * Can be necessary to ensure no recursion issues
   */
  moveSelfBeforeMainContent(){
    const mainContent = this.getMainContentElement();
    if ( !mainContent ) return;
    if( mainContent.previousElementSibling === this ) return;
    mainContent.before(this);
    this.selfMoved = true;
  }

  /**
   * @description Moves the main content element into this element and assigns it a slot
   */
  slotInMainContent(){
    const mainContent = this.getMainContentElement();
    if ( !mainContent ) return;
    mainContent.setAttribute('slot', 'main-content');
    this.appendChild(mainContent);
  }

  /**
   * @description Get the main content element for the page (from light dom)
   * @returns {HTMLElement} main content element
   */
  getMainContentElement() {
    const errorText = 'Could not find main content element';
    const filters = document.querySelector('.em-filter-wrapper');
    if ( !filters ) {
      console.warn(errorText);
    }
    if ( !filters.parentElement ) {
      console.warn(errorText);
    }
    return filters.parentElement;
  }

  /**
   * @description Get the sidebar element for the page (from light dom)
   * If it doesn't exist, one will be created and assigned a slot
   */
  getSidebarElement(){
    const eleClass = 'ucdlib-sidebar-slot';
    let sidebar = document.querySelector(`.${eleClass}`);
    if( !sidebar ) {
      sidebar = document.createElement('div');
      sidebar.classList.add(eleClass);
      sidebar.setAttribute('slot', 'sidebar');
      this.appendChild(sidebar);
    }
    return sidebar;
  }

  /**
   * @description Move elements from the main content to the sidebar
   * Looks for the 'ucdlib-sidebar' class
   */
  moveElementsToSidebar(){
    const sidebar = this.getSidebarElement();
    const mainContent = this.getMainContentElement();
    if ( !sidebar || !mainContent ) return;

    const elements = mainContent.querySelectorAll('.ucdlib-sidebar');
    elements.forEach(ele => {
      sidebar.appendChild(ele);
    });
  }

}

customElements.define('ucdlib-channel', UcdlibChannel);
