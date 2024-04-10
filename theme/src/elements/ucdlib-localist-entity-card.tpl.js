import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import headings from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import headingsClass from "@ucd-lib/theme-sass/2_base_class/_headings.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    [hidden] {
      display: none !important;
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
    .aspect--1x1 {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding-top: 100%;
    }
    .template--teaser {
      display: flex;
    }
    .template--teaser .img-container {
      margin-right: 1rem;
      max-width: 135px;
      width: 25%;
      min-width: 25%;
    }
    .template--card .name {
      margin-top: 1rem;
    }
    .name a {
      text-decoration: none;
      color: var(--forced-contrast-heading-primary, #022851);
    }
    .name a:hover {
      text-decoration: underline;
      color: var(--forced-contrast-heading-primary, #022851);
    }
    .address {
      display: flex;
      align-items: flex-start;
    }
    .address svg {
      width: 1rem;
      min-width: 1rem;
      height: 1rem;
      min-height: 1rem;
      margin-right: .5rem;
      margin-top: .32rem;
      color: #73ABDD;
    }
  `;

  return [
    headings,
    headingsClass,
    elementStyles
  ];
}

export function render() {
return html`
  <div class='template--${this.template}'>
    ${this.template === 'teaser' ? renderTeaser.call(this) : renderCard.call(this)}
  </div>
`;}

function renderTeaser(){
  return html`
    <div class="img-container">
      <a href=${this.url} ?hidden=${!this.imgTeaserSrc}>
        <div class="u-background-image aspect--1x1" style="background-image: url('${this.imgTeaserSrc}')"></div>
      </a>
    </div>
    <div class="content">
      <h4 class='name'>
        <a href=${this.url}>${this.name}</a>
      </h4>
      ${renderAddress.call(this)}
      <div ?hidden=${this.hideExcerpt} class='excerpt'>${this.excerpt}</div>
    </div>
  `;
}

function renderCard(){
  return html`
    <div class="img-container">
      <a href=${this.url} ?hidden=${!this.imgCardSrc}>
        <div class="u-background-image aspect--16x9" style="background-image: url('${this.imgCardSrc}')"></div>
      </a>
    </div>
    <div class="content">
      <h4 class='name'>
        <a href=${this.url}>${this.name}</a>
      </h4>
      ${renderAddress.call(this)}
      <div ?hidden=${this.hideExcerpt} class='excerpt'>${this.excerpt}</div>
    </div>
  `;
}

function renderAddress(){
  return html`
    <div ?hidden=${!(this.entityType=='places' && this.address)} class='address'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
      <div>${this.address}</div>
    </div>
  `;

}
