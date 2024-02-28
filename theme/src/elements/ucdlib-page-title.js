import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-page-title.tpl.js";

/**
 * @class UcdlibPageTitle
 * @description A very simple custom element for displaying a branded page title
 */
export default class UcdlibPageTitle extends LitElement {

  static get properties() {
    return {
      pageTitle: {type: String, attribute: 'page-title'},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.pageTitle = '';
  }

}

customElements.define('ucdlib-page-title', UcdlibPageTitle);
