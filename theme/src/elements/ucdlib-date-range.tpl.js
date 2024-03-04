import { html, css, svg } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      width: 100%;
      margin-right: 1rem;
    }
    .main {
      display: flex;
      align-items: center;
    }
    a {
      width: 2rem;
      height: 2rem;
      min-width: 2rem;
      min-height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #13639E;
      transition: color 0.2s;
    }
    a:hover {
      color: #FFBF00;
    }
    a svg {
      width: 50%;
      height: 50%;
    }
    .text {
      flex: 1;
      color: #022851;
      font-size: 1.207rem;
      font-weight: 700;
      margin: 0 1rem;
    }
  `;

  return [elementStyles];
}

export function render() {
  const leftChevron = svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
    </svg>
  `;
  const rightChevron = svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
    </svg>
  `;
  if ( !this.label || !this.prevLink || !this.nextLink ) return html``;
  return html`
    <div class='main'>
      <a href=${this.prevLink}>${leftChevron}</a>
      <div class='text'>${this.label}</div>
      <a href=${this.nextLink}>${rightChevron}</a>
    </div>

`;}
