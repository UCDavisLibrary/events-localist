import { html, css } from 'lit';
import breadcrumbs from "@ucd-lib/theme-sass/4_component/_nav-breadcrumbs.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .loading {
      margin-top: .9em;
      margin-bottom: 1.75rem;
      padding: 0 1rem;
    }
    .dot {
      display: inline-block;
      width: .5rem;
      height: .5rem;
      border-radius: 50%;
      background-color: #b0d0ed;
      animation: 1s ease-in-out infinite loading;
    }
    .dot--one {
      animation-delay: 0s;
    }
    .dot--two {
      animation-delay: .2s;
    }
    .dot--three {
      animation-delay: .4s;
    }
    @keyframes loading {
      0%, 100% {
        transform: scale(0);
      }
      50% {
        transform: scale(1);
      }
    }

  `;

  return [
    breadcrumbs,
    elementStyles
  ];
}

export function render() {
  if ( !this.hasInitialized ) return html`
    <div class='loading'>
      <div class='dot dot--one'></div>
      <div class='dot dot--two'></div>
      <div class='dot dot--three'></div>
    </div>
  `;
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
