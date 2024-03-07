import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-breadcrumbs.tpl.js";

import domUtils from '../utils/dom-utils.js';

export default class UcdlibBreadcrumbs extends LitElement {

  static get properties() {
    return {
      crumbs: {type: Array},
      localistDomain: {type: String, attribute: 'localist-domain'},
      datalabChannelPath: {type: String, attribute: 'datalab-channel-path'},
      localistHomeText: {type: String, attribute: 'localist-home-text'},
      isChannelPage: {type: Boolean, attribute: 'is-channel-page'},
      hasInitialized: {state: true}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.datalabChannelPath = 'datalab';
    this.localistHomeText = 'Events';
    this.isChannelPage = false;
    this.hasInitialized = false;

    this.crumbs = [];
  }

  connectedCallback(){
    super.connectedCallback();
    if ( document && document.readyState == 'complete' ){
      this.init();
    } else {
      window.addEventListener('load', () => {
        this.init();
      });
    }
  }

  init(){
    if ( !this.getLocalistEle() ) return;
    this.setLocalistDomain();
    this.crumbs = this.transformCrumbs();
    this.hideLocalistEle();
    this.hasInitialized = true;
  }

  /**
   * @description Transform the localist breadcrumb data into breadcrumb data for this component
   *  - Changes name of localist home crumb (or removes if datalab)
   *  - Adds either datalab or ucdlib site as first crumb
   *  - Adds datalab channel crumb if applicable
   */
  transformCrumbs(){
    const crumbs = this.getLocalistCrumbs();
    if ( !crumbs.length ) return crumbs;

    if ( domUtils.getPageTheme() == 'datalab' ){
      crumbs.shift(); // drop localist home crumb
      if ( this.isChannelPage ){
        crumbs[0].text = this.localistHomeText;
      } else {
        crumbs.unshift({
          text: this.localistHomeText,
          href: this.getDatalabChannel()
        })
      }
    } else {
      crumbs[0].text = this.localistHomeText;
      if ( !this.isChannelPage ){
        crumbs[0].href = this.localistDomain;
      }
    }

    crumbs.unshift({
      text: 'Home',
      href: domUtils.getThemeDomain()
    });

    return crumbs;
  }

  /**
   * @description Hide the native localist breadcrumb element
   */
  hideLocalistEle(){
    const localistEle = this.getLocalistEle();
    if ( !localistEle ) return;
    localistEle.style.display = 'none';
  }

  /**
   * @description Get the breadcrumb element that localist renders
   */
  getLocalistEle(){
    if ( this.localistEle ) return this.localistEle;
    this.localistEle = document.querySelector('#breadcrumbs');
    return this.localistEle;
  }

  /**
   * @description Get the contents of the localist breadcrumb element as an array of text and href
   */
  getLocalistCrumbs(){
    const localistEle = this.getLocalistEle();
    if ( !localistEle ) return [];

    const crumbs = [];
    const links = localistEle.querySelectorAll('a');
    links.forEach(link => {
      crumbs.push({
        text: link.innerText,
        href: link.href
      });
    });
    const lastCrumb = localistEle.querySelector('li.em-breadcrumbs_last');
    if ( lastCrumb ){
      crumbs.push({
        text: lastCrumb.innerText,
        href: ''
      });
    }
    if ( this.isChannelPage && !lastCrumb ){
      const firstCrumb = localistEle.querySelector('li.em-breadcrumbs_first');
      if ( firstCrumb ){
        crumbs.push({
          text: firstCrumb.innerText,
          href: ''
        });
      }
    }
    return crumbs;
  }

  /**
   * @description Set the localist domain based on the current window location if not set by attribute
   */
  setLocalistDomain(){
    if ( !this.localistDomain ) {
      this.localistDomain = window.location.origin;
    }
  }

  /**
   * @description Get the datalab channel url
   */
  getDatalabChannel(){
    return `${this.localistDomain}/${this.datalabChannelPath}`;
  }

}

customElements.define('ucdlib-breadcrumbs', UcdlibBreadcrumbs);
