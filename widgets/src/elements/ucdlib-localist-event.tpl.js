import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export function render() {
  if ( !this.dataLoaded || !this.template || !this.templates[this.template] ) return html``;
  return this.templates[this.template]();
}

export function templateBasic(){
  return html`
    <div class="event-template-basic flex">
      <div class="img-container">
        ${this.event.img_html ? unsafeHTML(this.event.img_html) : ''}
      </div>
      <div class="event-body">
        <div>
          <h2 class='heading--highlight'>${this.event.name || ''}</h2>
          <div class='bold'>${this.getDateString()}</div>
          <div class='bold'>${renderLocation.call(this)}</div>
        </div>
        <div class='u-space-mt'>${this.event.description_text}</div>
        <div class='u-space-mt'><a href="#" class="btn btn--primary btn--sm">Primary Button</a></div>
      </div>
    </div>
    `
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
