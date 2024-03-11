import { html, css } from 'lit';

import headings from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import headingClasses from "@ucd-lib/theme-sass/2_base_class/_headings.css.js";
import buttons from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    [hidden] {
      display: none !important;
    }
    .heading--primary {
      margin-top: 0;
    }
    .main {
      padding: 2rem;
      background-size: cover;
      background-position: center;
      background-color: #ebf3fa;
    }
    .img-flex {
      width: 100%;
      margin-bottom: 1rem;
    }
    .img-container {
      position: relative;
      padding-top: 100%;
      overflow: hidden;
    }
    .img-container img {
      height: auto;
      position: absolute;
      top: 0;
      border-radius: 50%;
      border: 8px solid #fff;
      width: 100%;
      box-sizing: border-box;
    }
    .content-wrapper {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
    .text-content {
      margin: auto 0;
    }
    .register-container {
      margin-top: 1rem;
    }
    .pointer {
      cursor: pointer;
    }
    .btn {
      box-sizing: border-box;
    }
    .dates-container ::slotted(*) {
      margin-top: 1rem;
      margin-bottom: 0;
    }
    .actions-container ::slotted(*) {
      margin-top: 1rem;
      margin-bottom: 0;
    }
    @media (min-width: 61.25em) {
      .content-wrapper {
        max-width: 60rem;
      }
    }

    @media (min-width: 48em) {
      .content-wrapper {
        flex-direction: row;
      }
      .img-flex {
        width: 25%;
        min-width: 25%;
        margin-right: 2rem;
      }
    }

    @media (min-width: 48em) and (max-width: 61.24em) {
      .content-wrapper {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }
    @media (min-width: 20em) and (max-width: 47.99em)  {
      .content-wrapper {
        max-width: 45rem;
      }
    }
  `;

  return [
    headings,
    buttons,
    headingClasses,
    elementStyles
  ];
}

export function render() {
return html`
  <div class='main' style='background-image:url(${this.backgroundImage})'>
    <div class='content-wrapper'>
      <div class='img-flex' ?hidden=${!this.imgSrc}>
        <div class='img-container'>
          ${this.imgLightboxLink ? html`
            <a tabindex='-1' @click=${this._onImgLightboxClick} class='pointer'>
              <img src=${this.imgSrc} alt=${this.imgAlt}>
            </a>` : html`
              <img src=${this.imgSrc} alt=${this.imgAlt}>
            `}
        </div>
      </div>
      <div class='text-content'>
        <h1 class="heading--primary">${this.headingText}</h1>
        <div class='dates-container'>
          <slot name="dates"></slot>
        </div>
        <div class='actions-container'>
          <slot name="actions"></slot>
        </div>
        <div class='register-container' ?hidden=${!this.registerLink}>
          <a class='btn btn--primary' href=${this.registerLink}>Register</a>
        </div>
      </div>
    </div>

  </div>
`;}
