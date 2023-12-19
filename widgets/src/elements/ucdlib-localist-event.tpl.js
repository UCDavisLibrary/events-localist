import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import normalize from "@ucd-lib/theme-sass/normalize.css.js";
import baseHtml from "@ucd-lib/theme-sass/1_base_html/_index.css.js";
import baseClass from "@ucd-lib/theme-sass/2_base_class/_index.css.js";
//import l2col from "@ucd-lib/theme-sass/5_layout/_l-2col.css.js";
//import lgridRegions from "@ucd-lib/theme-sass/5_layout/_l-grid-regions.css.js";

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
  .flex {
    display: flex;
  }
  .event-template-basic .img-container {
    margin-right: 1rem;
    max-width: 25%;
  }
  `;

  return [
    normalize,
    baseHtml,
    baseClass,
    elementStyles
  ];
}

export function render() {
  if ( !this.dataLoaded || !this.template || !this.templates[this.template] ) return html``;
  return this.templates[this.template]();
}

export function templateBasic(){
  return html`
    <div class="event-template-basic flex">
      <div class="img-container">
        ${this.event.img_html ? unsafeHTML(this.event.img_html) : ''}
      </div>
      <div class="">
        <h2 class='heading--highlight'>${this.event.name || ''}</h2>
      </div>
    </div>
    `
}
