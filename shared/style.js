import { css } from 'lit';

import normalize from "@ucd-lib/theme-sass/normalize.css.js";
import baseHtml from "@ucd-lib/theme-sass/1_base_html/_index.css.js";
import baseClass from "@ucd-lib/theme-sass/2_base_class/_index.css.js";
//import l2col from "@ucd-lib/theme-sass/5_layout/_l-2col.css.js";
//import lgridRegions from "@ucd-lib/theme-sass/5_layout/_l-grid-regions.css.js";
import spaceUtils from "@ucd-lib/theme-sass/6_utility/_u-space.css.js";

export default function styles() {
  const elementStyles = css`
  :host {
    display: block;
    color: #000;
    line-height: 1.618;
    font-size: 1rem;
    box-sizing: border-box;
    font-family: "proxima-nova", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
    grid-template-columns: 1rem auto;
    gap: .5rem;
  }
  .icon-grid__icon {
    color: #73ABDD;
  }
  ucdlib-localist-event {
    display: block;
    margin-bottom: 1.5rem;
  }
  ucdlib-localist-event .event-template-teaser .img-container {
    margin-right: .5rem;
    max-width: 15%;
  }
  @media (min-width: 480px) {
    ucdlib-localist-event .event-template-teaser .img-container {
      margin-right: 1rem;
      max-width: 25%;
    }
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
