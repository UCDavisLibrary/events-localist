import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-event.tpl.js";

import { JsonScriptObserver } from "../controllers/json-script-observer.js";

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
        this.startDate = this._constructDate(this.event.starts_at);
        this.endDate = this._constructDate(this.event.ends_at);
      }

    }
  }


  /**
   * @description Construct a date object from a localist date string
   */
  _constructDate(localistDateTime){
    let d = null;
    try {
      const arr = localistDateTime.split(' ');
      d = new Date(`${arr[0]}T${arr[1]}${arr[2]}`);
      if ( isNaN(d.getTime()) ) d = null;
    } catch (error) {
      d = null;
    }
    return d;
  }

}

customElements.define('ucdlib-localist-event', UcdlibLocalistEvent);
