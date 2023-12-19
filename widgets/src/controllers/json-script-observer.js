import { MutationObserverController } from '@ucd-lib/theme-elements/utils/controllers/index.js';

/**
 * @description A controller that will watch the child list of the host element for a json script tag
 * and set the host element's properties to the values in the json script tag.
 * @property {LitElement} host - the host element
 * @property {Array} props - an array of properties to set on the host element.  If empty, all properties
 */
export class JsonScriptObserver {
  constructor(host, props=[]){
    (this.host = host).addController(this);
    this.props = props;
    this.host._jsonScriptObserverCallback = this._onChildListMutation.bind(this);
    this.MutationObserverController = new MutationObserverController(this.host, {childList: true}, '_jsonScriptObserverCallback');
  }

  _onChildListMutation(){
    Array.from(this.host.children).forEach(child => {
      if ( child.nodeName === 'SCRIPT' && child.type === 'application/json' ) {
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
        this.host.requestUpdate();
        return;
      }
    });
  }
}
