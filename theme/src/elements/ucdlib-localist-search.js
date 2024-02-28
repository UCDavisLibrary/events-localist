import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-localist-search.tpl.js";

/**
 * @class UcdlibLocalistSearch
 * @description A custom element for displaying a search bar for the localist events calendar
 */
export default class UcdlibLocalistSearch extends LitElement {

  static get properties() {
    return {
      labelText: {type: String, attribute: 'label-text'},
      placeholderText: {type: String, attribute: 'placeholder-text'},
      domain: {type: String},
      logUrl: {type: Boolean, attribute: 'log-url'}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.labelText = '';
    this.placeholderText = '';
    this.domain = 'https://events.library.ucdavis.edu';
  }

  /**
   * @description Lit lifecycle hook
   */
  firstUpdated(){

    // set interval until search form style is updated
    // i cant figure out how to listen for the update-complete event
    const interval = setInterval(() => {
      if( this.updateSearchFormStyles() ) {
        clearInterval(interval);
      }
    }, 100);
  }


  /**
   * @description Updates the styles of the search form
   * @returns {boolean} true if the search form was found and styles updated
   */
  updateSearchFormStyles(){
    const searchForm = this.renderRoot.querySelector('ucd-theme-search-form');
    if ( !searchForm ) return;
    const input = searchForm.renderRoot.querySelector('input');
    if ( !input ) return;
    input.style.fontSize = '1rem';
    return true;
  }

  /**
   * @description Handles the search event from the search form
   * @param {CustomEvent} e
   * @returns
   */
  _onSearch(e){
    const searchTerm = encodeURIComponent(e.detail.searchTerm).replace(/%20/g, '+');
    const url = `${this.domain}/search/events/?search=${searchTerm}`;
    if ( this.logUrl ) {
      console.log('Search URL', url);
      return;
    }
    window.location = url;
  }

}

customElements.define('ucdlib-localist-search', UcdlibLocalistSearch);
