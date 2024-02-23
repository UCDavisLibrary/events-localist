import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-datepicker.tpl.js";

import datepicker from 'js-datepicker'

export default class UcdlibDatepicker extends LitElement {

  static get properties() {
    return {
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
  }

  firstUpdated(){
    this.instantiateDatepicker();

  }

  instantiateDatepicker(){
    const datepickerEle = this.renderRoot.getElementById('dp-root');
    if ( !datepickerEle ) return;

    const options = {
      alwaysShow: true,
      customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
      onSelect: this._onSelect.bind(this),
      onMonthChange: this._onMonthChange.bind(this)
    };

    this.datePicker = datepicker(datepickerEle, options);
  }

  _onSelect(instance, date){
    this.selectedDate = date;
    console.log('selected date', this.selectedDate);
  }

  _onMonthChange(){
    const visibleYear = this.datePicker.currentYear;
    const today = new Date();
    this.isSameYear = today.getFullYear() === visibleYear;
  }

}

customElements.define('ucdlib-datepicker', UcdlibDatepicker);
