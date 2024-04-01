import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-localist-entity-cards.tpl.js";

export default class UcdlibLocalistEntityCards extends LitElement {

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

customElements.define('ucdlib-localist-entity-cards', UcdlibLocalistEntityCards);