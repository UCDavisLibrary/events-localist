import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-channel.tpl.js";

export default class UcdlibChannel extends LitElement {

  static get properties() {
    return {

    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

  connectedCallback(){
    super.connectedCallback();
    this.init();
  }

  init(){
    this.moveSelfBeforeMainContent();
    this.slotInMainContent();
    this.moveElementsToSidebar();
  }

  /**
   * @description Move this element just before the main content element
   */
  moveSelfBeforeMainContent(){
    const mainContent = this.getMainContentElement();
    if ( !mainContent ) return;
    mainContent.before(this);
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
