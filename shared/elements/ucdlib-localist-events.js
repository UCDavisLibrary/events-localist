import { LitElement } from 'lit';
import * as templates from "./ucdlib-localist-events.tpl.js";
import styles from "../style.js";

import { MutationObserverController } from '@ucd-lib/theme-elements/utils/controllers/index.js';
import { JsonScriptObserver } from "../controllers/json-script-observer.js";

/**
 * @description Displays a list of localist events (ucdlib-localist-event elements)
 */
export default class UcdlibLocalistEvents extends LitElement {

  static get properties() {
    return {
      relativeCalendarUrl: { type: String },
      eventLayout: { type: String, attribute: 'event-layout' }
    }
  }

  static get styles() {
    return styles();
  }

  willUpdate(props){
    if (props.has('eventLayout')) {
      const allowedValues = ['teaser__1'];
      if ( !allowedValues.includes(this.eventLayout) ) {
        console.warn('Invalid event-layout value.  Must be one of: ', allowedValues.join(', '));
        this.eventLayout = 'teaser__1';
      }
      this.adoptEvents();
    }
  }

  firstUpdated(){
    this.adoptEvents();
    this.hideBrandedFooter();
  }

  constructor() {
    super();
    this.render = templates.render.bind(this);
    this.relativeCalendarUrl = '';
    this.eventLayout = 'teaser__1';

    this.MutationObserverController = new MutationObserverController(this, {childList: true}, 'adoptEvents');
    this._jsonScriptObserver = new JsonScriptObserver(this);
  }


  /**
   * @description Move any ucdlib-localist-event elements from the light dom into the shadow dom
   * @returns
   */
  adoptEvents(){
    const eventsContainer = this.renderRoot.querySelector('#events');
    if ( !eventsContainer ) return;

    // clear any existing events
    eventsContainer.innerHTML = '';

    const events = Array.from(this.querySelectorAll('ucdlib-localist-event'));
    events.forEach(eventEle => {
      const copy = eventEle.cloneNode(true);
      const [template, columns] = this.eventLayout.split('__');
      copy.setAttribute('template', template);

      if ( columns == 1) {
        eventsContainer.appendChild(copy);
      }

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
