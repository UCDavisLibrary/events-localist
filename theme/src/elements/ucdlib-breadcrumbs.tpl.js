import { html, css } from 'lit';
import breadcrumbs from "@ucd-lib/theme-sass/4_component/_nav-breadcrumbs.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
  `;

  return [
    breadcrumbs,
    elementStyles
  ];
}

export function render() {
  if ( !this.crumbs.length ) return html``;
  return html`
    <ol class="breadcrumbs">
      ${this.crumbs.map(crumb => html`
        ${crumb.href ? html`
          <li><a href="${crumb.href}">${crumb.text}</a></li>
        ` : html`
          <li>${crumb.text}</li>
        `}
      `)}
    </ol>
  `;
}
