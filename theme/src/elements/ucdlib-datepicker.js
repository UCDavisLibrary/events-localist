import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-datepicker.tpl.js";

import datepicker from 'js-datepicker'

/**
 * @class UcdlibDatepicker
 * @description Datepicker component. When a date is selected, the user is redirected to the calendar week view for that date.
 *
 * @prop {String} calendarUrl - The base url for the calendar. i.e. https://events.library.ucdavis.edu/datalab/calendar
 */
export default class UcdlibDatepicker extends LitElement {

  static get properties() {
    return {
      calendarUrl: {type: String, attribute: 'calendar-url'},
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

    // necessary if more than one element on the page
    this.datePickerId = Math.random().toString(36).substring(7);
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

    const selectedDate = this.getDateFromUrl();

    const options = {
      id: this.datePickerId,
      alwaysShow: true,
      customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
      showAllDates: true,
      onSelect: this._onSelect.bind(this),
      onMonthChange: this._onMonthChange.bind(this),
      maxDate: (new Date(3000, 1, 1))
    };
    if ( selectedDate ) options.dateSelected = selectedDate;

    this.datePicker = datepicker(datepickerEle, options);

    const endOptions = {
      id: this.datePickerId
    }
    this.datePickerEnd = datepicker(datepickerEndEle, endOptions);
  }

  /**
   * @description Get the date from the url
   * URL varies depending on the date interval that is selected (ie month week or day)
   * ${calendarUrl}/${dateInterval}/${year}/${month}/${day}
   * @returns Date
   */
  getDateFromUrl(){
    const urlSplit = window.location.href.split('/');

    // url can be month, day, or week
    // has three parts: year/month/day after specified date interval
    if ( urlSplit.includes('day') ){
      const i = urlSplit.indexOf('day');
      if ( urlSplit.length < i+4 ) return new Date();
      const year = urlSplit[i+1];
      const month = urlSplit[i+2];
      const day = urlSplit[i+3];
      return new Date(year, month-1, day);
    } else if ( urlSplit.includes('week') ){
      const i = urlSplit.indexOf('week');
      if ( urlSplit.length < i+4 ) return new Date();
      const year = urlSplit[i+1];
      const month = urlSplit[i+2];
      const day = urlSplit[i+3];
      return new Date(year, month-1, day);
    } else if ( urlSplit.includes('month') ){
      const i = urlSplit.indexOf('month');
      if ( urlSplit.length < i+3 ) return new Date();
      const year = urlSplit[i+1];
      const month = urlSplit[i+2];
      return new Date(year, month-1);
    }
  }

  _onSelect(instance, date){
    this.selectedDate = date;
    if ( !this.calendarUrl ) {
      console.warn('No calendar url provided for datepicker');
      return;
    }
    const start = this._getStartofWeek(date);
    const url = `${this.calendarUrl}/week/${start.getFullYear()}/${start.getMonth()+1}/${start.getDate()}`;
    //window.location.href = url;

  }

  // get start of current week (week starts on sunday)
  _getStartofWeek(date){
    const day = date.getDay();
    if ( !day ) return date;
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

  _onMonthChange(){
    const visibleYear = this.datePicker.currentYear;
    const today = new Date();
    this.isSameYear = today.getFullYear() === visibleYear;
  }

}

customElements.define('ucdlib-datepicker', UcdlibDatepicker);
