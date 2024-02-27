import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-datepicker.tpl.js";
import UrlParser from '../utils/url-parser.js';

import datepicker from 'js-datepicker'

/**
 * @class UcdlibDatepicker
 * @description Datepicker component. When a date is selected, the user is redirected to the calendar week view for that date.
 *
 * @prop {String} calendarUrl - The base url for the calendar. i.e. https://events.library.ucdavis.edu/datalab/calendar
 * @prop {String} queryUrl - The url to parse for the initial start and end dates. If not provided, the current url is used.
 * @prop {Boolean} logUrl - If true, the url is logged to the console instead of redirecting the user.
 * @prop {String} datePickerId - The id option passed to the datepicker class. If not provided, a random id is generated.
 */
export default class UcdlibDatepicker extends LitElement {

  static get properties() {
    return {
      calendarUrl: {type: String, attribute: 'calendar-url'},
      buttonText: {type: String, attribute: 'button-text'},
      queryUrl: {type: String, attribute: 'query-url'},
      logUrl: {type: Boolean, attribute: 'log-url'},
      datePickerId: {type: String, attribute: 'date-picker-id'},
      selectedDate: {state: true},
      isSameYear: {state: true}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.isSameYear = true;

    this.selectedDate = new Date();
    this.calendarUrl = '';
    this.queryUrl = '';
    this.logUrl = false;
    this.buttonText = 'Reset to Present';

    // necessary if more than one element on the page
    this.datePickerId = Math.random().toString(36).substring(10);
  }

  /**
   * @description Lit lifecycle method. Called after the element's DOM has been updated the first time.
   */
  firstUpdated(){
    this.instantiateDatepicker();
  }

  /**
   * @description Instantiate js-datepicker library
   */
  instantiateDatepicker(){
    const datepickerEle = this.renderRoot.getElementById('dp-root');
    const datepickerEndEle = this.renderRoot.getElementById('dp-end');
    if ( !datepickerEle ) return;

    const options = {
      id: this.datePickerId,
      alwaysShow: true,
      customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
      showAllDates: true,
      onSelect: this._onSelect.bind(this),
      onMonthChange: this._onMonthChange.bind(this),
      maxDate: (new Date(3000, 1, 1))
    };
    this.datePicker = datepicker(datepickerEle, options);

    const endOptions = {
      id: this.datePickerId
    }
    this.datePickerEnd = datepicker(datepickerEndEle, endOptions);

    this.setStateFromUrl();
  }

  /**
   * @description Sets the inital state of the datepicker from the queryUrl property or current url
   * @returns
   */
  setStateFromUrl(){
    if ( !this.datePicker ) return;

    // parse url
    const url = this.queryUrl || window.location.href;
    const urlParser = new UrlParser(url);

    // set start date
    const startDate = urlParser.getStartDate();
    this.datePicker.setDate(startDate);
    this.selectedDate = startDate;

    // set end date
    const endDate = urlParser.getEndDate();
    if ( endDate ){
      this.setEndDate(endDate);
    }
  }

  /**
   * @method setEndDate
   * @description Set the end date for the datepicker if is date range
   * @param {Date} date
   * @returns
   */
  setEndDate(date){
    const datepickerEle = this.renderRoot.getElementById('dp-root');
    const datepickerEndEle = this.renderRoot.getElementById('dp-end');

    if ( !datepickerEndEle || !datepickerEle ) return;
    this.datePickerEnd.setDate(date);

    // reset max date and re-render visible datepicker
    // otherwise any date links after end date will be disabled
    const selected = this.selectedDate || new Date();
    this.datePicker.maxDate = new Date(3000, 0, 1);
    this.datePicker.navigate(selected);
  }

  /**
   * @description Event handler for when a date is selected
   * @param {*} instance - The datepicker instance
   * @param {Date} date - The selected date
   * @returns
   */
  _onSelect(instance, date){
    this.selectedDate = date;
    this.datePickerEnd.setDate();
    if ( !this.calendarUrl ) {
      console.warn('No calendar url provided for datepicker');
      return;
    }
    const start = this._getStartofWeek(date);
    const url = `${this.calendarUrl}/week/${start.getFullYear()}/${start.getMonth()+1}/${start.getDate()}`;
    if ( this.logUrl ) {
      console.log(url);
    } else {
      window.location.href = url;
    }

  }

  /**
   * @description Get the start of the week (sunday) for a given date
   * @param {Date} date
   * @returns
   */
  _getStartofWeek(date){
    date = new Date(date);
    const day = date.getDay();
    if ( !day ) return date;
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

  /**
   * @description Event handler for when the user changes the displayed month
   */
  _onMonthChange(){
    const visibleYear = this.datePicker.currentYear;
    const today = new Date();
    this.isSameYear = today.getFullYear() === visibleYear;
  }

}

customElements.define('ucdlib-datepicker', UcdlibDatepicker);
