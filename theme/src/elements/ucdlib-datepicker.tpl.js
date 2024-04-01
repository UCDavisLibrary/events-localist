import { html, css, unsafeCSS, svg } from 'lit';

import datePickerCss from "js-datepicker/dist/datepicker.min.css";
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";

const clockIcon = svg`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/>
</svg>
`

export function styles() {

  const elementStyles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
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
    .qs-active, .qs-range-middle, .qs-range-end {
      background-color: #DBEAF7;
    }
    .qs-current {
      text-decoration: none;
      border: 1px solid #FFBF00;
      font-weight: inherit;
    }
    .qs-active.qs-current, .qs-range-middle.qs-current, .qs-range-end.qs-current {
      border: none;
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

    #dp-root {
      display: none !important;
    }
    #dp-end {
      display: none !important;
    }
    .btn--invert {
      transition: background-color 0.3s ease;
    }
    .btn--invert:hover {
      padding: 0.625em 1.5em 0.625em 0.75em;
      background-color: #FFBF00;
    }
    .btn--invert::before {
      content: '';
    }
    .btn__icon {
      display: block;
      width: 15px;
      height: 15px;
      margin-right: .5rem;
      color: #FFBF00;
      transition: color 0.3s ease;
    }
    .btn--invert:hover .btn__icon {
      color: #022851;
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
    <div class='btn-container' ?hidden=${this.hideResetButton}>
      <a href="${this.getCalendarUrl()}/week" class="btn btn--invert btn--block">
        <span class='btn__icon'>${clockIcon}</span>
        <span>${this.buttonText}</span>
      </a>
    </div>
  </div>
`;}
