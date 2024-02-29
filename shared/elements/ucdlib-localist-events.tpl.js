import { html, css } from 'lit';

import layouts from "@ucd-lib/theme-sass/5_layout/_index.css.js";

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
  `;

  return [
    layouts,
    elementStyles
  ];
}

export function render() {

  if (this.columnCount == 1) {
    return renderOneColumn.call(this);
  } else {
    return renderMultiColumn.call(this);
  }
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


