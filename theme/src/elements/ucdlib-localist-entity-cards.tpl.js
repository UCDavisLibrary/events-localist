import { html, css } from 'lit';

import layouts from "@ucd-lib/theme-sass/5_layout/_index.css.js";
import buttons from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    ::slotted(*) {
      margin-bottom: 1rem;
    }
    .l-second, .l-third, .l-fourth {
      margin-top: 0 !important;
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
    <div>
      ${this.columnCount == 1 ? renderOneColumn.call(this) : renderMultiColumn.call(this)}
    </div>
    <div ?hidden=${!(this.showCalendarLink && this.calendarUrl)}>
      <a href=${this.calendarUrl} class="btn btn--primary btn--block">${this.calendarLinkText}</a>
    </div>
  `;
}

function renderOneColumn(){
  return html`
  <div>
    ${this.entities.map(entity => html`
      <slot name=${entity.slotName}></slot>
    `)}
  </div>
  `;
}

function renderMultiColumn(){
  // chunk entities into rows
  let rows = [];
  let currentRow = [];
  this.entities.forEach((entity, index) => {
    currentRow.push(entity);
    if (currentRow.length === this.columnCount || index === this.entities.length-1) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  const columnClasses = ['l-first', 'l-second', 'l-third', 'l-fourth'];
  return html`
    <div>
      ${rows.map(row => html`
        <div class='l-${this.columnCount}col'>
          ${row.map((entity, i) => html`
            <div class=${columnClasses[i]}>
              <slot name=${entity.slotName}></slot>
            </div>
          `)}
        </div>
      `)}
    </div>
  `
}
