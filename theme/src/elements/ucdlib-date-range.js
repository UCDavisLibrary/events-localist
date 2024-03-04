import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-date-range.tpl.js";

/**
 * @class UcdlibDateRange
 * @description A custom element for displaying a date range with previous and next links
 * @property {String} label - The label for the date range
 * @property {String} prevLink - The url for the previous link
 * @property {String} nextLink - The url for the next link
 */
export default class UcdlibDateRange extends LitElement {

  static get properties() {
    return {
      label: { type: String },
      prevLink: { type: String, attribute: 'prev-link' },
      nextLink: { type: String, attribute: 'next-link' }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.label = '';
    this.prevLink = '';
    this.nextLink = '';
  }

}

customElements.define('ucdlib-date-range', UcdlibDateRange);
