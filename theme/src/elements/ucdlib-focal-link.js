import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-focal-link.tpl.js";

export default class UcdlibFocalLink extends LitElement {

  static get properties() {
    return {
      href: {type: String},
      displayText: {type: String, attribute: 'display-text'},
      brandColor: {type: String, attribute: 'brand-color'},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.href = '';
    this.displayText = '';
    this.brandColor = '';
  }

}

customElements.define('ucdlib-focal-link', UcdlibFocalLink);
