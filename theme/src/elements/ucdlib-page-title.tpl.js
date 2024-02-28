import { html, css } from 'lit';

import headings from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import pageTitle from "@ucd-lib/theme-sass/4_component/_page-title.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
  `;

  return [
    headings,
    pageTitle,
    elementStyles
  ];
}

export function render() {
return html`
  <section>
    <h1 class='page-title'>${this.pageTitle}</h1>
  </section>
`;}
