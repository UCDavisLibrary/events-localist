import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-datepicker.tpl.js";
import UrlParser from '../utils/url-parser.js';
import domUtils from '../utils/dom-utils.js';

import datepicker from 'js-datepicker'

/**
 * @class UcdlibDatepicker
 * @description Datepicker component. When a date is selected, the user is redirected to the calendar week view for that date.
 *
 * @prop {String} calendarUrl - The base url for the calendar. i.e. https://events.library.ucdavis.edu/datalab/calendar
 * @prop {String} buttonText - The text for the reset button
 * @prop {String} queryUrl - The url to parse for the initial start and end dates. If not provided, the current url is used.
 * @prop {Boolean} logUrl - If true, the url is logged to the console instead of redirecting the user.
 * @prop {String} datePickerId - The id option passed to the datepicker class. If not provided, a random id is generated.
 * @prop {Boolean} startOfWeek - If true, the datepicker will navigate to the start of the week when a date is selected.
 */
export default class UcdlibDatepicker extends LitElement {

  static get properties() {
    return {
      calendarUrl: {type: String, attribute: 'calendar-url'},
      buttonText: {type: String, attribute: 'button-text'},
      queryUrl: {type: String, attribute: 'query-url'},
      logUrl: {type: Boolean, attribute: 'log-url'},
      datePickerId: {type: String, attribute: 'date-picker-id'},
      startOfWeek: {type: Boolean, attribute: 'start-of-week'},
      hideResetButton: {type: Boolean, attribute: 'hide-reset-button'},
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
    this.startOfWeek = false;
    this.hideResetButton = false;

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
    this.hideResetButton = this._isSameDate(startDate, new Date());
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
   * @description Get calendar url for current channel
   * @returns {String}
   */
  getCalendarUrl(){
    return this.calendarUrl || domUtils.getCalendarUrl();
  }

  /**
   * @description Event handler for when a date is selected
   * @param {*} instance - The datepicker instance
   * @param {Date} date - The selected date
   * @returns
   */
  _onSelect(instance, date){
    this.selectedDate = date;

    // build base url
    this.datePickerEnd.setDate();
    let calendarUrl = this.getCalendarUrl();
    if ( this.startOfWeek ) {
      date = this._getStartofWeek(date);
    }
    let url = `${calendarUrl}/week/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;

    // add active filters
    let currentFilters = domUtils.getActiveEventFilters(true);
    const filtersToRemove = ['start_date', 'days'];
    filtersToRemove.forEach(f => currentFilters.delete(f));
    const urlParser = new UrlParser(this.queryUrl || window.location.href);
    const search = urlParser.getSearchTerm();
    if ( search ) {
      currentFilters.set('search', search);
    }
    if ( currentFilters.toString() ) {
      url += `?${currentFilters.toString()}`;
    }

    // log or redirect
    if ( this.logUrl ) {
      console.log(url);
    } else {
      window.location.href = url;
    }

  }

  /**
   * @description Get the start of the week (sunday) for a given date
   * @param {Date} date
   * @returns {Date}
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

  /**
   * @description Utility function to determine if two dates are the same
   * @param {DateTime} date1
   * @param {DateTime} date2
   * @returns
   */
  _isSameDate(date1, date2){
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }

}

customElements.define('ucdlib-datepicker', UcdlibDatepicker);
