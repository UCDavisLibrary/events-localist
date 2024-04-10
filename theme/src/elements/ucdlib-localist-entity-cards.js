import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-localist-entity-cards.tpl.js";

import { MutationObserverController } from '@ucd-lib/theme-elements/utils/controllers/index.js';
import { JsonScriptObserver } from "../../../shared/controllers/json-script-observer.js";

export default class UcdlibLocalistEntityCards extends LitElement {

  static get properties() {
    return {
      columnCount: { type: Number, attribute: 'column-count' },
      entities: { state: true }

    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.columnCount = 1;
    this.entities = [];

    this.MutationObserverController = new MutationObserverController(this, {childList: true}, 'adoptEntities');
    this._jsonScriptObserver = new JsonScriptObserver(this);
  }

  /**
   * @description Lit lifecycle hook
   * @param {*} props
   */
  willUpdate(props){
    if (props.has('columnCount')) {
      if ( this.columnCount < 1 || this.columnCount > 4 ) {
        console.warn('Invalid column-count value.  Must be between 1 and 4');
        this.columnCount = 1;
      }
    }
  }

  /**
   * @description Lit lifecycle hook
   */
  connectedCallback(){
    super.connectedCallback();
    this.adoptEntities();

    const filterForm = document.querySelector('#filter-dropdown');
    if (filterForm) {
      filterForm.addEventListener('input', (e) => this._onFilterInput(e));
    }
  }

  /**
 * @description Slot in any ucdlib-localist-entity-card elements from the light dom into the shadow dom
 * @returns
 */
  adoptEntities(){
    const entities = [];
    Array.from(this.querySelectorAll('ucdlib-localist-entity-card')).forEach((ele, i) => {
      const slotName = `entity-${i}`;
      const entity = {ele, slotName};
      entities.push(entity);

      ele.setAttribute('slot', slotName);
    });

    const newEntitiesAdopted = entities.length != this.entities.length;
    this.entities = entities;

    if ( newEntitiesAdopted ) {
      // set initial design based on card size from filter dropdown
      const filterForm = document.querySelector('#filter-dropdown');
      if (filterForm) {
        const size = filterForm.querySelector('input[name="card_size"]:checked')?.value;
        this.setDesignFromCardSize(size);
      }
    }

  }

  /**
   * @description Event handler for any input event in Localist's filter dropdown
   * @param {*} e
   * @returns
   */
  _onFilterInput(e){
    if ( !e.target || e.target.getAttribute('data-action') != 'card-size-change') return;
    const size = e.target.getAttribute('data-card-size');

    this.setDesignFromCardSize(size);
  }

  setDesignFromCardSize(size){
    if ( size == 'small' ){
      this.useDesign('3col');
    } else if ( size == 'medium' ) {
      this.useDesign('2col');
    } else {
      this.useDesign('1col');
    }
  }

  useDesign(design){
    const designs = {
      '3col': {
        columns: 3,
        template: 'card',
        hideExcerpt: true
      },
      '2col': {
        columns: 2,
        template: 'card',
      },
      '1col': {
        columns: 1,
        template: 'teaser',
      },
      'mobile': {
        columns: 1,
        template: 'card'
      }
    };

    if ( !designs[design] ) {
      console.warn('Invalid design value.  Must be one of: ', Object.keys(designs).join(', '));
      return;
    }

    this.columnCount = designs[design].columns;

    this.entities.forEach(entity => {
      entity.ele.setAttribute('template', designs[design].template);
      if ( designs[design].hideExcerpt ) {
        entity.ele.setAttribute('hide-excerpt', '');
      } else {
        entity.ele.removeAttribute('hide-excerpt');
      }
    });
  }

}

customElements.define('ucdlib-localist-entity-cards', UcdlibLocalistEntityCards);
