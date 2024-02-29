import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-events.tpl.js";

import { MutationObserverController } from '@ucd-lib/theme-elements/utils/controllers/index.js';
import { JsonScriptObserver } from "../controllers/json-script-observer.js";

/**
 * @description Displays a list of localist events (ucdlib-localist-event elements)
 */
export default class UcdlibLocalistEvents extends LitElement {

  static get properties() {
    return {
      relativeCalendarUrl: { type: String },
      eventLayout: { type: String, attribute: 'event-layout' },
      columnCount: { type: Number, attribute: 'column-count' },
      events: { state: true }
    }
  }

  static get styles() {
    return templates.styles();
  }

  willUpdate(props){
    if (props.has('eventLayout')) {
      if ( !this.allowedLayouts.includes(this.eventLayout) ) {
        console.warn('Invalid event-layout value.  Must be one of: ', this.allowedLayouts.join(', '));
        this.eventLayout = 'teaser';
      }
    }
    if (props.has('columnCount')) {
      if ( this.columnCount < 1 || this.columnCount > 4 ) {
        console.warn('Invalid column-count value.  Must be between 1 and 4');
        this.columnCount = 1;
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.adoptEvents();
    this.hideBrandedFooter();
  }

  constructor() {
    super();
    this.render = templates.render.bind(this);
    this.relativeCalendarUrl = '';
    this.allowedLayouts = ['teaser', 'card'];
    this.eventLayout = 'teaser';
    this.columnCount = 1;
    this.events = [];

    this.MutationObserverController = new MutationObserverController(this, {childList: true}, 'adoptEvents');
    this._jsonScriptObserver = new JsonScriptObserver(this);
  }


  /**
   * @description Slot in any ucdlib-localist-event elements from the light dom into the shadow dom
   * @returns
   */
  adoptEvents(){
    const events = [];
    Array.from(this.querySelectorAll('ucdlib-localist-event')).forEach((ele, i) => {
      const slotName = `event-${i}`;
      const event = {ele, slotName};
      events.push(event);

      ele.setAttribute('slot', slotName);
      ele.setAttribute('template', this.eventLayout);
    });

    this.events = events;
  }

  updateEventLayout(layout){
    if ( layout && !this.allowedLayouts.includes(layout) ) {
      console.warn('Invalid event-layout value.  Must be one of: ', this.allowedLayouts.join(', '));
      return;
    } else if ( layout ) {
      this.eventLayout = layout;
    }
    this.events.forEach(event => {
      event.ele.setAttribute('template', this.eventLayout);
    });
  }

  /**
   * @description Hide all localist branded widget footers
   */
  hideBrandedFooter(){
    const brandedFooters = document.querySelectorAll('#lclst_widget_footer');
    brandedFooters.forEach(footer => {
      footer.style.display = 'none';
    });
  }

}

customElements.define('ucdlib-localist-events', UcdlibLocalistEvents);
