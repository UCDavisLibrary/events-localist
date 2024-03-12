/**
 * @class UrlParser
 * @description Utilities for parsing a Localist URL
 * @param {String} url - The url to parse
 */
export default class UrlParser {

  constructor(url){
    this.url = url || window.location.href;
  }

  /**
   * @description Get the start date from the calendar url
   * @returns {Date}
   */
  getStartDate(){
    const startDate = this._getStartDate();
    if ( isNaN(startDate.getTime()) ){
      return new Date();
    }
    return startDate;
  }

  /**
   * @description Get the search term from the calendar url
   * @returns {String}
   */
  getSearchTerm(){
    const url = new URL(this.url);
    const params = new URLSearchParams(url.search);
    return params.get('search');
  }

  /**
   * @description Get the search parameters for the url
   * @returns {URLSearchParams}
   */
  getParams(){
    const url = new URL(this.url);
    return new URLSearchParams(url.search);
  }

  /**
   * @description Get the origin of the url
   * @returns {String}
   */
  getOrigin(){
    const url = new URL(this.url);
    return url.origin;
  }

  getPath(){
    const url = new URL(this.url);
    return url.pathname;
  }

  /**
   * @description Get the start date from the calendar url path
   * It is usually the last three path segments - restOfUrl/year/month/day
   * @returns {Date}
   */
  _getStartDate(){
    const urlSplit = this.urlPathAsArray();
    const intervals = ['day', 'week', 'month'];
    const defaultDate = new Date();

    for ( let interval of intervals ){
      if ( urlSplit.includes(interval) ){
        const i = urlSplit.indexOf(interval);
        if ( urlSplit.length < i+3 ) return defaultDate;
        const year = urlSplit[i+1];
        const month = urlSplit[i+2];
        const day = urlSplit[i+3] || 1;
        return new Date(year, month-1, day);
      }
    }
    return defaultDate;
  }

  /**
   * @description Get the calendar url path as an array
   * @returns {Array<String>}
   */
  urlPathAsArray(){
    return this.url.split('?')[0].split('/').filter(x => x.trim());
  }

  /**
   * @description Get the end date from the calendar url
   * @returns {Date|undefined}
   */
  getEndDate(){
    const startDate = this.getStartDate();
    const url = new URL(this.url);
    const params = new URLSearchParams(url.search);
    const urlSplit = this.urlPathAsArray();

    if ( params.has('days') ){
      const days = parseInt(params.get('days'));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + days - 1);
      return endDate;
    }

    if ( urlSplit.includes('week') ){
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      return endDate;
    }

    if ( urlSplit.includes('month') ){
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(0);
      return endDate;
    }

    // default is 30 day view
    if ( urlSplit[urlSplit.length-1] == 'calendar' ){
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 29);
      return endDate;
    }
  }
}
