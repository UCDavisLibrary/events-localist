import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-single-hero.tpl.js";

import { JsonScriptObserver } from "../../../shared/controllers/json-script-observer.js";

/**
 * @class UcdlibSingleHero
 * @description Hero component for a single page (event, place, department, etc.)
 * @property {String} backgroundImage - Background image for hero
 * @property {String} headingText - Heading text for hero
 * @property {String} imgLightboxLink - Lightbox link for image
 * @property {String} registerLink - Register link for event
 * @property {String} streamInfo - Stream info for event (html as string)
 * @property {String} imgEle - Image element (html as string)
 *
 */
export default class UcdlibSingleHero extends LitElement {

  static get properties() {
    return {
      backgroundImage: {type: String, attribute: 'background-image'},
      headingText: {type: String, attribute: 'heading-text'},
      imgLightboxLink: {type: String, attribute: 'img-lightbox-link'},
      registerLink: {type: String, attribute: 'register-link'},
      streamInfo: {type: String},
      imgEle: {type: String},
      imgSrc: {state: true},
      imgAlt: {state: true}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.backgroundImage = 'https://files.library.ucdavis.edu/localist/images/blue--1.webp';
    this.headingText = '';
    this.imgLightboxLink = '';
    this.registerLink = '';
    this.resetImgProperties();

    this._jsonScriptObserver = new JsonScriptObserver(this, [], '_onDomChildPropertyChanged');
  }

  _onDomChildPropertyChanged(){

    this.setImgPropsFromEle();
    this.setRegisterLinkFromStreamInfo();
    this.requestUpdate();
  }

  /**
   * @description Extract register link from streamInfo property (DOM as string) and set registerLink property
   * @returns
   */
  setRegisterLinkFromStreamInfo(){
    if ( !this.streamInfo ) return;
    const ele = document.createElement('div');
    ele.innerHTML = this.streamInfo;

    let registerLink = '';
    let aTags = ele.querySelectorAll('a');
    for (const link of Array.from(aTags)) {
      if ( link.textContent.toLowerCase().includes('register') ) {
        registerLink = link.getAttribute('href');
        break;
      }
    }
    if ( registerLink ) {
      this.registerLink = registerLink;
    }
  }


  /**
   * @description Extract img src and alt from imgEle property and set imgSrc and imgAlt properties
   * @returns
   */
  setImgPropsFromEle(){
    if ( this.imgEle ) {
      const ele = document.createElement('div');
      ele.innerHTML = this.imgEle;
      const img = ele.querySelector('img');
      if ( !img) {
        this.resetImgProperties();
        return;
      }
      this.imgSrc = img.getAttribute('src');
      this.imgAlt = img.getAttribute('alt');
    } else {
      this.resetImgProperties();
    }
  }

  /**
   * @description Reset imgSrc and imgAlt properties
   */
  resetImgProperties(){
    this.imgSrc = '';
    this.imgAlt = '';
  }

  /**
   * @description Attached to image click event.  If imgLightboxLink is set, open lightbox
   */
  _onImgLightboxClick(){
    if ( !this.imgLightboxLink || !window.openIbox ) return;
    window.openIbox(this.imgLightboxLink);
  }

}

customElements.define('ucdlib-single-hero', UcdlibSingleHero);
