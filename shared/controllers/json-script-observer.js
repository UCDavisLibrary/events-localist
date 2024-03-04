import { MutationObserverController } from '@ucd-lib/theme-elements/utils/controllers/index.js';

/**
 * @description A controller that will watch the child list of the host element for a json script tag
 * and set the host element's properties to the values in the json script tag.
 * Also looks for template tags
 * @property {LitElement} host - the host element
 * @property {Array} props - an array of properties to set on the host element.  If empty, all properties
 * @property {String} hostCallback - the name of the host element's method to call after properties are set
 */
export class JsonScriptObserver {
  constructor(host, props=[], hostCallback='requestUpdate'){
    (this.host = host).addController(this);
    this.props = props;
    this.hostCallback = hostCallback;
    this.host._jsonScriptObserverCallback = this._onChildListMutation.bind(this);
    this.MutationObserverController = new MutationObserverController(this.host, {childList: true}, '_jsonScriptObserverCallback');
  }

  _onChildListMutation(){
    let requestUpdate = false;
    Array.from(this.host.children).forEach(child => {
      if ( (child.nodeName === 'SCRIPT') && child.type === 'application/json' ) {
        let data = {};
        try {
          data = JSON.parse(child.text);
        } catch(e) {
          console.error('Error parsing JSON script', e);
        }
        for( let key in data ) {
          if ( this.props.length && this.props.indexOf(key) === -1 ) continue;
          this.host[key] = data[key];
        }
        requestUpdate = true;
        return;
      }

      if ( child.nodeName === 'TEMPLATE' && child.hasAttribute('ele-prop') ) {
        let prop = child.getAttribute('ele-prop');
        if ( this.props.length && this.props.indexOf(prop) === -1 ) return;

        // handle if ele prop has a dot in it
        let keys = prop.split('.');
        let obj = this.host;
        for( let i = 0; i < keys.length-1; i++ ) {
          if ( !obj[keys[i]] ) obj[keys[i]] = {};
          obj = obj[keys[i]];
        }

        // handle prop type and assign value
        const propType = child.hasAttribute('ele-prop-type') ? child.getAttribute('ele-prop-type') : 'string';
        if ( propType === 'boolean' ) {
          obj[keys[keys.length-1]] = child.innerHTML === 'true' ? true : false;
        } else if ( propType === 'array' ) {
          const separator = child.hasAttribute('ele-prop-separator') ? child.getAttribute('ele-prop-separator') : ',';
          obj[keys[keys.length-1]] = child.innerHTML.split(separator).map(item => item.trim());
        } else {
          obj[keys[keys.length-1]] = child.innerHTML;
        }
        requestUpdate = true;
        return;
      }
    });
    if ( requestUpdate ) this.host[this.hostCallback]();
  }
}
