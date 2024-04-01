import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-localist-entity-card.tpl.js";

import { JsonScriptObserver } from "../../../shared/controllers/json-script-observer.js";

export default class UcdlibLocalistEntityCard extends LitElement {

  static get properties() {
    return {
      entityType: {type: String, attribute: 'entity-type'},
      name: {type: String},
      url: {type: String},
      address: {type: String},
      description: {type: String},
      excerpt: {type: String},
      imgCard: {type: String, attribute: 'img-card'},
      imgTeaser: {type: String, attribute: 'img-teaser'},
      hideExcerpt: { type: Boolean, attribute: 'hide-excerpt'},
      excerptLength: { type: Number, attribute: 'excerpt-length' }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.entityType = 'place';
    this.name = '';
    this.url = '';
    this.address = '';
    this.description = '';
    this.imgCard = '';
    this.imgTeaser = '';
    this.hideExcerpt = false;
    this.excerptLength = 140;
    this.excerpt = '';

    this._jsonScriptObserver = new JsonScriptObserver(this, [], '_onDomChildPropertyChanged');
  }

  _onDomChildPropertyChanged() {
    this.name = this.name.replace(/&amp;/g, '&');
    this._setExcerpt();


    this.requestUpdate();
  }

  /**
   * @description Sets the shortened version of the description (if applicable)
   * @returns {String} - the description excerpt
   */
    _setExcerpt(){
      if ( !this.description ) {
        this.excerpt = '';
        return;
      }
      const excerpt = this.description.replace(/&amp;/g, '&');
      if ( excerpt.length <= this.excerptLength ) {
        this.excerpt = excerpt;
        return;

      }
      this.excerpt = excerpt.substring(0, this.excerptLength) + '...';
    }

}

customElements.define('ucdlib-localist-entity-card', UcdlibLocalistEntityCard);
