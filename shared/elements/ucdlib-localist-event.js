import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-event.tpl.js";

import { JsonScriptObserver } from "../controllers/json-script-observer.js";
import DatetimeUtils from "../utils/datetime.js";

/**
 * @description Displays a single localist event
 */
export default class UcdlibLocalistEvent extends LitElement {

  static get properties() {
    return {
      event: { type: Object },
      hideExcerpt: { type: Boolean, attribute: 'hide-excerpt'},
      excerptLength: { type: Number, attribute: 'excerpt-length' },
      template: { type: String },
      dataLoaded: { state: true },
      templates: { state: true },
      startDate: { state: true },
      endDate: { state: true },
      firstDate: { state: true },
      lastDate: { state: true },
      cardImageSrc: { state: true }
    }
  }

  static get styles() {
    return templates.styles();
  }

  constructor() {
    super();
    this.render = templates.render.bind(this);
    this.event = {};
    this.dataLoaded = false;
    this.hideExcerpt = false;
    this.excerptLength = 140;

    this.templates = {
      'teaser': templates.teaser.bind(this),
      'card': templates.card.bind(this)
    }
    this.template = 'teaser';

    this._jsonScriptObserver = new JsonScriptObserver(this);

  }

  willUpdate() {
    if ( !this.dataLoaded ) {
      this.dataLoaded = (this.event || {}).name ? true : false;
      if ( this.dataLoaded ){

        // extract/process some data from the event
        this.startDate = DatetimeUtils.dateFromLocalist(this.event.starts_at);
        this.endDate = DatetimeUtils.dateFromLocalist(this.event.ends_at);
        this.firstDate = DatetimeUtils.dateFromIsoDate(this.event.first_date);
        this.lastDate = DatetimeUtils.dateFromIsoDate(this.event.last_date);
        this.setCardImageSrc();
      }
    }
  }

  setCardImageSrc(){
    if ( !this.event.img_html ) return;

    // get the image src from the img_html string
    const imgContainer = document.createElement('div');
    imgContainer.innerHTML = this.event.img_html;
    const img = imgContainer.querySelector('img');
    if ( !img ) return;
    const imgSrc = (img.src || '').replace('square_300', 'card');
    this.cardImageSrc = imgSrc;

  }

  getExcerpt(){
    if ( !this.event.description_text ) return '';
    if ( this.event.description_text.length <= this.excerptLength ) return this.event.description_text;
    return this.event.description_text.substring(0, this.excerptLength) + '...';
  }

  getDateString(){

    // this is a long running multi-day event, like an exhibit
    if ( this.event.has_instances && !this.endDate && this.firstDate && this.lastDate ){
      return DatetimeUtils.getDateString(this.firstDate, this.lastDate, true);
    }

    return DatetimeUtils.getDateString(this.startDate, this.endDate);
  }


}

customElements.define('ucdlib-localist-event', UcdlibLocalistEvent);
