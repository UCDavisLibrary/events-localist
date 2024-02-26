import { html, css, unsafeCSS } from 'lit';

import datePickerCss from "js-datepicker/dist/datepicker.min.css";
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";

export function styles() {

  const elementStyles = css`
    :host {
      display: block;
    }
    .main {
      border: 1px solid #B0D0ED;
      max-width: 550px;
      margin: 0 auto;
      container-type: inline-size;
      container-name: ucdlib-datepicker;
    }
    ${unsafeCSS(datePickerCss)}

    .qs-datepicker-container {
      width: 100%;
      position: static;
      box-shadow: none;
      border-radius: 0;
      border: none;
    }
    .qs-controls {
      padding: 1rem 0;
      background-color: transparent;
      color: #022851;
      border-bottom: 1px solid #FFBF00;
      margin: 0.5rem 1rem;
      box-sizing: border-box;
      width: unset;
    }
    .qs-arrow.qs-right::after {
      border-left-color: #13639e;
    }
    .qs-arrow.qs-left::after {
      border-right-color: #13639e;
    }
    .qs-day {
      color: #000;
    }
    .qs-square {
      height: 2em;
      border-radius: 0;
    }
    .is-same-year .qs-year {
      display: none;
    }
    .qs-active {
      background-color: #DBEAF7;
    }
    .qs-range-middle {
      background-color: #DBEAF7;
    }
    .qs-current {
      text-decoration: none;
      border: 1px solid #FFBF00;
    }
    .qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover {
      background-color: #FFBF00;
    }
    .qs-squares {
      padding: .5rem;
    }

    .btn {
      box-sizing: border-box;
    }
    .btn-container {
      padding: .5rem;
    }

    @container ucdlib-datepicker (min-width: 400px) {
      .qs-datepicker {
        font-size: 1.5rem;
      }
      .qs-squares {
        padding: .5rem 1rem;
      }
      .btn-container {
        padding: 1rem;
      }
    }
    @container ucdlib-datepicker (min-width: 500px) {
      .qs-datepicker {
        font-size: 1.75rem;
      }
    }

    #dp-root {
      display: none !important;
    }
    #dp-end {
      display: none !important;
    }
  `;

  return [
    buttonStyles,
    elementStyles
  ];
}

export function render() {
return html`
  <div class='main ${this.isSameYear ? 'is-same-year' : ''}'>
    <div>
      <input id='dp-root' />
      <input id='dp-end' />
    </div>
    <div class='btn-container'>
      <a href="${this.calendarUrl}/week" class="btn btn--alt3 btn--block">View This Week</a>
    </div>
  </div>
`;}
