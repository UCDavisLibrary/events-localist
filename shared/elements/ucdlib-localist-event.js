import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-event.tpl.js";

import { JsonScriptObserver } from "../controllers/json-script-observer.js";
import DatetimeUtils from "../utils/datetime.js";

/**
 * @description Displays a single localist event
 * @property {Object} event - the localist event object
 * @property {Boolean} hideExcerpt - hide the event description
 * @property {Number} excerptLength - the length of the event description excerpt
 * @property {String} template - the template to use for rendering the event (teaser, card, highlight)
 */
export default class UcdlibLocalistEvent extends LitElement {

  static get properties() {
    return {
      event: { type: Object },
      hideExcerpt: { type: Boolean, attribute: 'hide-excerpt'},
      excerptLength: { type: Number, attribute: 'excerpt-length' },
      customDisplayDate: { type: String, attribute: 'custom-display-date' },
      cardImageSrc: { type: String, attribute: 'card-image-src'},
      teaserImageSrc: { type: String, attribute: 'teaser-image-src'},
      highlightButtonText: { type: String, attribute: 'highlight-button-text'},
      template: { type: String },
      dataLoaded: { state: true },
      templates: { state: true },
      startDate: { state: true },
      endDate: { state: true },
      firstDate: { state: true },
      lastDate: { state: true },
      name: { state: true }
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
    this.name = '';
    this.customDisplayDate = '';
    this.highlightButtonText = 'Register';

    this.cardImageSrc = '';
    this.teaserImageSrc = '';

    this.templates = {
      'teaser': templates.teaser.bind(this),
      'card': templates.card.bind(this),
      'highlight': templates.highlight.bind(this)
    }
    this.template = 'teaser';

    this._jsonScriptObserver = new JsonScriptObserver(this, [], '_onDomChildPropertyChanged');

  }


  /**
   * @description Called when the event property is set from the json script observer
   * Extracts and processes some data from the event and triggers a render
   */
  _onDomChildPropertyChanged(){

    // extract/process some data from the event
    this.startDate = DatetimeUtils.dateFromLocalist(this.event.starts_at);
    this.endDate = DatetimeUtils.dateFromLocalist(this.event.ends_at);
    this.firstDate = DatetimeUtils.dateFromIsoDate(this.event.first_date);
    this.lastDate = DatetimeUtils.dateFromIsoDate(this.event.last_date);
    this.setImageSrcs();
    this.setName();

    this.requestUpdate();
    this.dataLoaded = Object.keys(this.event || {}).length > 0;
  }

  /**
   * @description Sets the cardImageSrc/teaserImageSrc element property from the img_html event property
   */
  setImageSrcs(){
    if ( !this.event.img_html ) return;

    // get the image src from the img_html string
    const imgContainer = document.createElement('div');
    imgContainer.innerHTML = this.event.img_html;
    const img = imgContainer.querySelector('img');
    if ( !img ) return;
    const imgSrc = (img.src || '');
    this.teaserImageSrc = imgSrc;
    this.cardImageSrc = imgSrc.replace('square_300', 'card');
  }

  setName(){
    if ( !this.event.name ) this.name = '';
    this.name = this.event.name.replace(/&amp;/g, '&');
  }

  /**
   * @description Returns a shortened version of the event description (if applicable)
   * @returns {String} - the event description excerpt
   */
  getExcerpt(){
    if ( !this.event.description_text ) return '';
    const excerpt = this.event.description_text.replace(/&amp;/g, '&');
    if ( excerpt.length <= this.excerptLength ) return excerpt;
    return excerpt.substring(0, this.excerptLength) + '...';
  }

  /**
   * @description Returns a formatted date string for the event
   * @returns {String}
   */
  getDateString(){

    if ( this.customDisplayDate ) return this.customDisplayDate;

    // this is a long running multi-day event, like an exhibit
    if (
      this.event.has_many_future_instances &&
      !this.endDate &&
      this.firstDate &&
      this.lastDate &&
      this.firstDate.toDateString() !== this.lastDate.toDateString()
       ){
      return DatetimeUtils.getDateString(this.firstDate, this.lastDate, true);
    }

    return DatetimeUtils.getDateString(this.startDate, this.endDate);
  }


}

customElements.define('ucdlib-localist-event', UcdlibLocalistEvent);
