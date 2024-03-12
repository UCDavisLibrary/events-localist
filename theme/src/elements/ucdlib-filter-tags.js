import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-filter-tags.tpl.js";

import UrlParser from '../utils/url-parser.js';
import domUtils from '../utils/dom-utils.js';

/**
 * @class UcdlibFilterTags
 * @description Filter tags component for event search page
 * Displays active filters and allows user to remove them
 * @property {Array} activeFilters - Array of active filter objects
 */
export default class UcdlibFilterTags extends LitElement {

  static get properties() {
    return {
      activeFilters: {type: Array, attribute: 'active-filters'},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.activeFilters = [];
  }

  connectedCallback(){
    super.connectedCallback();
    this.init();
  }

  init(){
    const filters = this.getFiltersFromDom();
    this.activeFilters = filters.map((filter) => {
      return this.addLinkToFilter(filter);
    });
  }

  /**
   * @description Add a link to remove the filter from the current page
   * @param {Object} filter - A filter object from getFiltersFromDom array
   * @returns {Object} - Filter object with href property added
   */
  addLinkToFilter(filter){
    const urlParser = new UrlParser();
    const params = urlParser.getParams();
    if ( filter.multiple) {
      params.delete(filter.typeName + '[]', filter.optionValue);
    } else {
      params.delete(filter.typeName);
    }
    filter.href = urlParser.getOrigin() + urlParser.getPath() + '?' + params.toString();

    return filter;
  }

  /**
   * @description Get the current active event filters based on the filters form
   * @returns {Array} - Array of selected filter objects
   * - typeLabel: String - Label for filter type
   * - typeName: String - Name for filter type
   * - multiple: Boolean - Whether or not filter type allows multiple options
   * - optionLabel: String - Label for selected filter option
   * - optionValue: String - Value for selected filter option
   */
  getFiltersFromDom(){
    const filters = [];
    const form = domUtils.getFilterForm();
    if ( !form ) return filters;

    const experience = form.querySelector('select[name="experience"]');
    if ( experience ) {
      const option = experience.selectedOptions[0];
      if ( option && option.value ) {
        filters.push({
          typeLabel: 'Experience',
          typeName: 'experience',
          multiple: false,
          optionLabel: option.textContent,
          optionValue: option.value
        });
      }
    }

    const eventTypes = Array.from(form.querySelectorAll('select[name="event_types[]"]'));
    eventTypes.forEach((eventType) => {
      const options = Array.from(eventType.selectedOptions);
      options.forEach((option) => {
        filters.push({
          typeLabel: eventType.getAttribute('data-filter-label'),
          typeName: 'event_types',
          multiple: true,
          optionLabel: option.getAttribute('data-tag-name'),
          optionValue: option.value
        });
      });
    });

    return filters;
  }

}

customElements.define('ucdlib-filter-tags', UcdlibFilterTags);
