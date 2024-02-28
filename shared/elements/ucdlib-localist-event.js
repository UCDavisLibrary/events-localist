import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-event.tpl.js";

import Mixin from "@ucd-lib/theme-elements/utils/mixins/mixin.js";
import { MainDomElement } from "@ucd-lib/theme-elements/utils/mixins/main-dom-element.js";

import { JsonScriptObserver } from "../controllers/json-script-observer.js";
import DatetimeUtils from "../utils/datetime.js";

/**
 * @description Displays a single localist event
 */
export default class UcdlibLocalistEvent extends Mixin(LitElement)
  .with(MainDomElement) {

  static get properties() {
    return {
      event: { type: Object },
      hideExcerpt: { type: Boolean, attribute: 'hide-excerpt'},
      excerptLength: { type: Number, attribute: 'excerpt-length' },
      template: { type: String },
      dataLoaded: { state: true },
      templates: { state: true },
      startDate: { state: true },
      endDate: { state: true }
    }
  }

  constructor() {
    super();
    this.render = templates.render.bind(this);
    this.event = {};
    this.dataLoaded = false;
    this.hideExcerpt = false;
    this.excerptLength = 140;

    this.templates = {
      'teaser': templates.templateTeaser.bind(this)
    }
    this.template = 'teaser';

    this._jsonScriptObserver = new JsonScriptObserver(this);

  }

  willUpdate() {
    if ( !this.dataLoaded ) {
      this.dataLoaded = (this.event || {}).name ? true : false;
      if ( this.dataLoaded ){
        this.startDate = DatetimeUtils.dateFromLocalist(this.event.starts_at);
        console.log(this.event.starts_at, this.startDate);
        this.endDate = DatetimeUtils.dateFromLocalist(this.event.ends_at);
      }
    }
  }

  getExcerpt(){
    if ( this.hideExcerpt ) return '';
    if ( !this.event.description_text ) return '';
    if ( this.event.description_text.length <= this.excerptLength ) return this.event.description_text;
    return this.event.description_text.substring(0, this.excerptLength) + '...';
  }

  /**
   * @description Get a string representation of the event's datetime range
   */
  getDateString(){
    if (!this.startDate) return '';
    const isSingleDay = !this.endDate || this.startDate.toDateString() === this.endDate.toDateString();

    const startDay = DatetimeUtils.getDayOfWeek(this.startDate);
    const startMonth = DatetimeUtils.getMonth(this.startDate);
    const startDate = this.startDate.getDate();
    const startYear = this.startDate.getFullYear();
    const startTime = DatetimeUtils.getTime(this.startDate);

    if ( isSingleDay ) {
      let time = `${startTime.hours}:${startTime.minutes}`;
      if ( this.endDate ) {
        const endTime = DatetimeUtils.getTime(this.endDate);
        if ( startTime.ampm !== endTime.ampm ) {
          time += startTime.ampm;
        }
        time += ` - ${endTime.hours}:${endTime.minutes}${endTime.ampm}`;

      } else {
        time += startTime.ampm;
      }

      return `${startDay}, ${startMonth} ${startDate}, ${startYear} | ${time}`;
    }

    // todo: how to display multi-day events
    const endDay = DatetimeUtils.getDayOfWeek(this.endDate);
    const endMonth = DatetimeUtils.getMonth(this.endDate);
    const endDate = this.endDate.getDate();
    const endYear = this.endDate.getFullYear();
    const endTime = DatetimeUtils.getTime(this.endDate);

    const startString = `${startMonth} ${startDate}, ${startYear}, ${startTime.hours}:${startTime.minutes}${startTime.ampm}`;
    const endString = `${endMonth} ${endDate}, ${endYear}, ${endTime.hours}:${endTime.minutes}${endTime.ampm}`;
    return `${startString} - ${endString}`;
  }

}

customElements.define('ucdlib-localist-event', UcdlibLocalistEvent);
