import { html, css } from 'lit';
import '@ucd-lib/theme-elements/brand/ucd-theme-search-form/ucd-theme-search-form.js'

import headings from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    .h4 {
      color: #000;
    }
  `;

  return [
    headings,
    elementStyles
  ];
}

export function render() {
return html`
  <div>
    <label for="localist-search">
      <h4>${this.labelText}</h4>
    </label>
    <ucd-theme-search-form
      value=${this.value}
      @search=${this._onSearch}
      id="localist-search"
      placeholder="${this.placeholderText}">
    </ucd-theme-search-form>
  </div>


`;}
