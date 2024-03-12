import { html, css, svg } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .main {
      display: flex;
      flex-wrap: wrap;
    }
    .filter {
      margin-right: .5rem;
      margin-bottom: 1rem;
      background-color: #DBEAF7;
      border-radius: 5rem;
      padding: .5rem;
      padding-right: 1rem;
      color: #022851;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: .875rem;
    }
    .icon {
      text-decoration: none;
      color:#13639E;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
      margin-right: .5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon:hover {
      background-color: #13639E;
      color: #FFBF00;
    }
    .icon svg {
      width: 60%;
    }
  `;

  return [elementStyles];
}

export function render() {
return html`
  <div class='main'>
    ${this.activeFilters.map(filter => html`
      <div class='filter'>
        <a class='icon' href=${filter.href}>
          ${svg`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path fill='currentColor' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          `}
        </a>
        <div class='text'>${filter.typeLabel}: ${filter.optionLabel}</div>
      </div>
    `)}
  </div>


`;}
