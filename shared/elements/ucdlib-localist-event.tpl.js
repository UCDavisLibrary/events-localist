import { html, svg } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export function render() {
  if ( !this.dataLoaded || !this.template || !this.templates[this.template] ) return html``;
  return this.templates[this.template]();
}

export function templateTeaser(){
  return html`
    <div class="event-template-teaser flex">
      <div class="img-container">
        ${this.event.img_html ? html`
          <a href=${this.event.url}>
            ${unsafeHTML(this.event.img_html)}
          </a>
        ` : ''}
      </div>
      <div class="event-body">
        <div>
          <h2 class='heading--highlight'><a href=${this.event.url}>${this.event.name || ''}</a></h2>
          <div class='u-space-mb--small'>${this.getExcerpt()}</div>
          ${renderIconGrid.call(this)}
          <div class='bold'>${this.getDateString()}</div>
          <div class='bold'>${renderLocation.call(this)}</div>
        </div>
      </div>
    </div>
    `
}

function renderIconGrid(){
  return html`
    <div class="icon-grid">
      <div class='icon-grid__icon'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
      </div>
      <div>${this.getDateString()}</div>
    </div>
  `;
}

function renderLocation(){
  const hasRegistrationLink = this.event.needs_registration && this.event.url;
  const physicalLocation = `${this.event.location_name}${this.event.room_number ? ' ' + this.event.room_number : ''}`;
  if ( this.event.experience === 'virtual' || (this.event.experience === 'hybrid' && !physicalLocation)){
    return html`
      <div>
        <span>Location: Online</span>
        <span ?hidden=${!hasRegistrationLink}><a href=${this.event.url}>register for link</a></span>
      </div>`;
  }

  if ( this.event.experience === 'inperson' && physicalLocation ){
    return html`
      <div>
        <span>Location: ${physicalLocation}</span>
      </div>
    `;
  }

  if ( this.event.experience === 'hybrid' ){
    return html`
    <div>
      <span>Location: ${physicalLocation}</span>
      <span>and online</span>
      <span ?hidden=${!hasRegistrationLink}><a href=${this.event.url}>register for link</a></span>
    </div>
  `;

  }

  return html``;


}
