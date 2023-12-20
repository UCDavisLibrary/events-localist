import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-event.tpl.js";

import { JsonScriptObserver } from "../controllers/json-script-observer.js";
import DatetimeUtils from "../utils/datetime.js";

export default class UcdlibLocalistEvent extends LitElement {

  static get properties() {
    return {
      event: { type: Object },
      template: { type: String },
      dataLoaded: { state: true },
      templates: { state: true },
      startDate: { state: true },
      endDate: { state: true }
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

    this.templates = {
      'basic': templates.templateBasic.bind(this)
    }
    this.template = 'basic';

    this._jsonScriptObserver = new JsonScriptObserver(this);

  }

  willUpdate(props) {
    if ( props.has('event') ){
      this.dataLoaded = (this.event || {}).name ? true : false;
      if ( this.dataLoaded ){
        this.startDate = DatetimeUtils.dateFromLocalist(this.event.starts_at);
        this.endDate = DatetimeUtils.dateFromLocalist(this.event.ends_at);
      }
    }
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
