import { html } from 'lit';

export function render() {
return html`
  <div>
    <div id='events'></div>
    <div ?hidden=${!this.relativeCalendarUrl}>
      <a href=${this.relativeCalendarUrl}>View all events!!!</a>
    </div>
  </div>

`;}
