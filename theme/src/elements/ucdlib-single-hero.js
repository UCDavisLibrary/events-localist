import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-single-hero.tpl.js";

export default class UcdlibSingleHero extends LitElement {

  static get properties() {
    return {
      backgroundImage: {type: String, attribute: 'background-image'},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.backgroundImage = 'https://files.library.ucdavis.edu/localist/images/blue--1.webp';
  }

}

customElements.define('ucdlib-single-hero', UcdlibSingleHero);
