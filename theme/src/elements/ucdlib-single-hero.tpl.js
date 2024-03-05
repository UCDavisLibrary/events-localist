import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .main {
      padding: 2rem;
      background-size: cover;
      background-position: center;
      background-color: #ebf3fa;

    }
    @media (min-width: 61.25em) {
      .content-wrapper {
        max-width: 60rem;
      }
    }
    .content-wrapper {
      margin: 0 auto;
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

  return [elementStyles];
}

export function render() {
return html`
  <div class='main' style='background-image:url(${this.backgroundImage})'>

  </div>
`;}
