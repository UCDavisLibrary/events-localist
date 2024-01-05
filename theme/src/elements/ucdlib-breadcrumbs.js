import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-breadcrumbs.tpl.js";

import domUtils from '../dom-utils.js';

export default class UcdlibBreadcrumbs extends LitElement {

  static get properties() {
    return {
      crumbs: {type: Array}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

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
    this.crumbs = this.transformCrumbs();
    this.hideLocalistEle();
  }

  transformCrumbs(){
    console.log(domUtils.getThemeDomain());
    const crumbs = this.getLocalistCrumbs();
    return crumbs;
  }

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
    return crumbs;
  }

}

customElements.define('ucdlib-breadcrumbs', UcdlibBreadcrumbs);
