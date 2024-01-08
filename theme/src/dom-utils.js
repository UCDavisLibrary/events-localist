class DomUtils {

  /**
   * @description Get the header theme import script element
   */
  getHeaderImportScript(){
    if ( this.headerImportScript ) return this.headerImportScript;
    this.headerImportScript = document.querySelector('#ucdlib-header-html-import');
    return this.headerImportScript;
  }

  /**
   * @description Get the page theme slug based on the header import script
   * @returns {string} ucdlib|datalab
   */
  getPageTheme(){
    if ( this.pageTheme ) return this.pageTheme;
    this.pageTheme = 'ucdlib';
    const script = this.getHeaderImportScript();
    if ( !script || !script.src ) {
      return this.pageTheme;
    }
    if ( script.src.includes('datalab') ){
      this.pageTheme = 'datalab';
    }
    return this.pageTheme;
  }

  /**
   * @description Get the theme domain based on the header import script
   */
  getThemeDomain(){
    if ( this.themeDomain ) return this.themeDomain;
    this.themeDomain = '';
    const script = this.getHeaderImportScript();
    if ( !script || !script.src ) {
      return this.themeDomain;
    }
    const url = new URL(script.src);
    this.themeDomain = url.origin;
    return this.themeDomain;
  }

}

export default new DomUtils();
