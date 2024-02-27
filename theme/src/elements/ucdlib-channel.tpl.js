import { html, css } from 'lit';

import cols from "@ucd-lib/theme-sass/5_layout/_l-basic.css.js";
import container from "@ucd-lib/theme-sass/5_layout/_l-container.css.js";
import lgridRegions from "@ucd-lib/theme-sass/5_layout/_l-grid-regions.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
  `;

  return [
    cols,
    container,
    lgridRegions,
    elementStyles
  ];
}

export function render() {
return html`
  <div class="l-container">
    <div class="l-basic--flipped">
      <div class="l-content">
        <slot name="main-content"></slot>
      </div>
      <div class="l-sidebar-second">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
`;}
