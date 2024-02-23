import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-subnav-wp.tpl.js";

export default class UcdlibSubnavWp extends LitElement {

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

}

customElements.define('ucdlib-subnav-wp', UcdlibSubnavWp);