import { html, css } from 'lit';

import layouts from "@ucd-lib/theme-sass/5_layout/_index.css.js";
import buttons from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";

export function styles() {
  const elementStyles = css`
  :host {
    display: block;
    color: #000;
    line-height: 1.618;
    font-size: 1rem;
    box-sizing: border-box;
    font-family: "proxima-nova", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  .btn {
    box-sizing: border-box;
  }
  .centered {
    text-align: center;
  }

  `;

  return [
    layouts,
    buttons,
    elementStyles
  ];
}

export function render() {

  return html`
    <div ?hidden=${!this.events.length}>
      ${this.columnCount == 1 ? renderOneColumn.call(this) : renderMultiColumn.call(this)}
    </div>
    <div ?hidden=${this.events.length} class=${this.noEventsTextCentered ? 'centered' : ''}>
      ${this.noEventsText}
    </div>
    <div ?hidden=${!this.showCalendarLink}>
      <a href=${this.calendarUrl} class="btn btn--primary btn--block">${this.calendarLinkText}</a>
    </div>
  `;
}

function renderOneColumn(){
  return html`
  <div>
    ${this.events.map(event => html`
      <slot name=${event.slotName}></slot>
    `)}
  </div>
  `;
}

function renderMultiColumn(){
  // chunk events into rows
  let rows = [];
  let currentRow = [];
  this.events.forEach((event, index) => {
    currentRow.push(event);
    if (currentRow.length === this.columnCount || index === this.events.length-1) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  const columnClasses = ['l-first', 'l-second', 'l-third', 'l-fourth'];
  return html`
    <div>
      ${rows.map(row => html`
        <div class='l-${this.columnCount}col'>
          ${row.map((event, i) => html`
            <div class=${columnClasses[i]}>
              <slot name=${event.slotName}></slot>
            </div>
          `)}
        </div>
      `)}
    </div>
  `
}


