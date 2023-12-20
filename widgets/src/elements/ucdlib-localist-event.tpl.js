import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import normalize from "@ucd-lib/theme-sass/normalize.css.js";
import baseHtml from "@ucd-lib/theme-sass/1_base_html/_index.css.js";
import baseClass from "@ucd-lib/theme-sass/2_base_class/_index.css.js";
//import l2col from "@ucd-lib/theme-sass/5_layout/_l-2col.css.js";
//import lgridRegions from "@ucd-lib/theme-sass/5_layout/_l-grid-regions.css.js";
import spaceUtils from "@ucd-lib/theme-sass/6_utility/_u-space.css.js";

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
  .event-template-basic .event-body {
    flex: 1;
  }
  .event-template-basic .img-container {
    margin-right: .5rem;
    max-width: 15%;
  }
  @media (min-width: 480px) {
    .event-template-basic .img-container {
      margin-right: 1rem;
      max-width: 25%;
    }
  }

  .bold {
    font-weight: 700;
  }
  [hidden] {
    display: none !important;
  }
  `;

  return [
    normalize,
    baseHtml,
    baseClass,
    spaceUtils,
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
      <div class="event-body">
        <div>
          <h2 class='heading--highlight'>${this.event.name || ''}</h2>
          <div class='bold'>${this.getDateString()}</div>
          <div class='bold'>${renderLocation.call(this)}</div>
        </div>
        <div class='u-space-mt'>${this.event.description_text}</div>
        <div class='u-space-mt'><a href="#" class="btn btn--primary btn--sm">Primary Button</a></div>
      </div>
    </div>
    `
}

function renderLocation(){
  const hasRegistrationLink = this.event.needs_registration && this.event.url;
  const physicalLocation = `${this.event.location_name}${this.event.room_number ? ' ' + this.event.room_number : ''}`;
  if ( this.event.experience === 'virtual' || (this.event.experience === 'hybrid' && !physicalLocation)){
    return html`
      <div>
        <span>Location: Online</span>
        <span ?hidden=${!hasRegistrationLink}><a href=${this.event.url}>register for link</a></span>
      </div>`;
  }

  if ( this.event.experience === 'inperson' && physicalLocation ){
    return html`
      <div>
        <span>Location: ${physicalLocation}</span>
      </div>
    `;
  }

  if ( this.event.experience === 'hybrid' ){
    return html`
    <div>
      <span>Location: ${physicalLocation}</span>
      <span>and online</span>
      <span ?hidden=${!hasRegistrationLink}><a href=${this.event.url}>register for link</a></span>
    </div>
  `;

  }

  return html``;


}
