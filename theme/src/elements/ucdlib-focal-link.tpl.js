import { html, css } from 'lit';

import brandStyles from '@ucd-lib/theme-sass/4_component/_category-brand.css.js';
import focalLinkStyles from '@ucd-lib/theme-sass/4_component/_focal-link.css.js';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    ::slotted(svg) {
      width: 50%;
    }
   `;

  return [
    brandStyles,
    focalLinkStyles,
    elementStyles
  ];
}

export function render() {
return html`
  <a href=${this.href} class="focal-link ${this.brandColor ? `category-brand--${this.brandColor}` : ''} ">
    <div class="focal-link__figure focal-link__icon">
      <slot name="icon"></slot>
    </div>
    <div class="focal-link__body">
      <strong>${this.displayText}</strong>
    </div>
  </a>


`;}
