import { html, svg, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import headings from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import headingsClass from "@ucd-lib/theme-sass/2_base_class/_headings.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }
    .bold {
    font-weight: 700;
    }
    [hidden] {
      display: none !important;
    }
    .flex {
      display: flex;
    }
    .event-body {
      flex: 1;
    }
    .u-background-image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .aspect--16x9 {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding-top: 56.25%;
    }
    .heading--highlight a {
      text-decoration: none;
      color: var(--forced-contrast-heading-primary, #022851);
    }
    .heading--highlight a:hover {
      text-decoration: underline;
      color: var(--forced-contrast-heading-primary, #022851);
    }
    .icon-grid {
      display: grid;
      grid-template-columns: .9rem auto;
      gap: 0 .5rem;
      color: #4C4C4C;
      font-size: .875rem;
    }
    .icon-grid .icon-grid__icon {
      color: #73ABDD;
    }
    .event-template-teaser .img-container {
      margin-right: .5rem;
      max-width: 15%;
    }
    .event-template-teaser img {
      width: 100%;
      height: auto;
    }
    .event-template-teaser .excerpt {
      margin-bottom: .25rem;
    }
    @media (min-width: 480px) {
      .event-template-teaser .img-container {
        margin-right: 1rem;
        max-width: 25%;
      }
    }
    .event-template-card .excerpt {
      margin-bottom: .25rem;
    }
    .event-template-card .event-template-card__image {
      display: block;
      margin-bottom: .5rem;
    }
  `;
  return [
    headings,
    headingsClass,
    elementStyles
  ];
}

export function render() {
  if ( !this.dataLoaded || !this.template || !this.templates[this.template] ) return html``;
  return html`
    <div>
      ${this.templates[this.template]()}
    </div>
  `;
}

export function teaser(){
  return html`
    <div class="event-template-teaser flex">
      <div class="img-container">
        ${this.event.img_html ? html`
          <a href=${this.event.url}>
            ${unsafeHTML(this.event.img_html)}
          </a>
        ` : ''}
      </div>
      <div class="event-body">
        <div>
          <h2 class='heading--highlight'><a href=${this.event.url}>${this.name}</a></h2>
          <div ?hidden=${this.hideExcerpt} class='excerpt'>${this.getExcerpt()}</div>
          ${renderIconGrid.call(this)}
        </div>
      </div>
    </div>
    `
}

export function card(){
  return html`
    <div class="event-template-card">
      <a href=${this.event.url} class='event-template-card__image'>
      <div class="aspect--16x9 u-background-image" style="background-image: url('${this.cardImageSrc}')"></div>
      </a>
      <div>
        <h2 class='heading--highlight'><a href=${this.event.url}>${this.name}</a></h2>
        <div ?hidden=${this.hideExcerpt} class='excerpt'>${this.getExcerpt()}</div>
        ${renderIconGrid.call(this)}
      </div>
    </div>
  `
}

function renderIconGrid(){
  return html`
    <div class="icon-grid">
      <div class='icon-grid__icon'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
      </div>
      <div>${this.getDateString()}</div>
      <div class='icon-grid__icon'>
        ${this.event.experience == 'virtual' ? svg`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
        ` : svg`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
        `}
      </div>
      <div>
        ${this.event.experience == 'virtual' ? html`
          <span>Online Event</span>` : html`
          <span>${this.event.location_name} ${this.event.room_number}</span>
          <span ?hidden=${this.event.experience != 'hybrid'}>(and online)</span>
          `}
      </div>
    </div>
  `;
}
