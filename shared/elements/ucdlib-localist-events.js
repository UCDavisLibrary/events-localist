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
      calendarUrl: { type: String, attribute: 'calendar-url'},
      showCalendarLink: { type: Boolean, attribute: 'show-calendar-link' },
      calendarLinkText: { type: String, attribute: 'calendar-link-text' },
      eventLayout: { type: String, attribute: 'event-layout' },
      columnCount: { type: Number, attribute: 'column-count' },
      events: { state: true }
    }
  }

  static get styles() {
    return templates.styles();
  }

  /**
   * @description Lit lifecycle hook
   * @param {*} props
   */
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

  /**
   * @description Lit lifecycle hook
   */
  connectedCallback(){
    super.connectedCallback();
    this.adoptEvents();
    this.hideBrandedFooter();
    this.hideSmallCardOption();

    const filterForm = document.querySelector('#filter-dropdown');
    if (filterForm) {
      filterForm.addEventListener('input', (e) => this._onFilterInput(e));
    }
  }

  constructor() {
    super();
    this.render = templates.render.bind(this);
    this.calendarUrl = '';
    this.showCalendarLink = false;
    this.calendarLinkText = 'View Full Calendar';
    this.allowedLayouts = ['teaser', 'card'];

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('card_size') == 'medium') {
      this.eventLayout = 'card';
      this.columnCount = 2;
    } else {
      this.eventLayout = 'teaser';
      this.columnCount = 1;
    }
    this.events = [];

    this.MutationObserverController = new MutationObserverController(this, {childList: true}, 'adoptEvents');
    this._jsonScriptObserver = new JsonScriptObserver(this);
  }

  /**
   * @description Hide the small card option in the filter dropdown
   * It does not work well with the channel two column layout
   */
  hideSmallCardOption(){
    const selector = '#filter-dropdown [name="card_size"][value="small"]';
    const input = document.querySelector(selector);
    if (input) {
      input.parentElement.style.display = 'none';
    }
  }

  /**
   * @description Event handler for any input event in Localist's filter dropdown
   * @param {*} e
   * @returns
   */
  _onFilterInput(e){
    if ( !e.target || e.target.getAttribute('data-action') != 'card-size-change') return;
    if ( e.target.getAttribute('data-card-size') == 'medium' ){
      this.updateEventLayout('card');
      this.columnCount = 2;
    } else {
      this.updateEventLayout('teaser');
      this.columnCount = 1;
    }
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

  /**
   * @description Update the event layout for all events
   * @param {String} layout - 'teaser' or 'card'
   * @returns
   */
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
