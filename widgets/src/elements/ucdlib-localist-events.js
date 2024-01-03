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
      relativeCalendarUrl: { type: String }
    }
  }

  static get styles() {
    return styles();
  }

  firstUpdated(){
    this.adoptEvents();
  }

  constructor() {
    super();
    this.render = templates.render.bind(this);
    this.relativeCalendarUrl = '';

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

    const events = Array.from(this.querySelectorAll('ucdlib-localist-event'));
    events.forEach(eventEle => {
      eventsContainer.appendChild(eventEle);
    });
    this.hideBrandedFooter();
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
