class DatetimeUtils {

  constructor(){
    this._dayOfWeek = [
      { short: 'Sun', long: 'Sunday' },
      { short: 'Mon', long: 'Monday' },
      { short: 'Tue', long: 'Tuesday' },
      { short: 'Wed', long: 'Wednesday' },
      { short: 'Thu', long: 'Thursday' },
      { short: 'Fri', long: 'Friday' },
      { short: 'Sat', long: 'Saturday' }
    ];

    this._months = [
      { short: 'Jan', long: 'January' },
      { short: 'Feb', long: 'February' },
      { short: 'Mar', long: 'March' },
      { short: 'Apr', long: 'April' },
      { short: 'May', long: 'May' },
      { short: 'Jun', long: 'June' },
      { short: 'Jul', long: 'July' },
      { short: 'Aug', long: 'August' },
      { short: 'Sep', long: 'September' },
      { short: 'Oct', long: 'October' },
      { short: 'Nov', long: 'November' },
      { short: 'Dec', long: 'December' }
    ];

  }

  /**
   * @description Construct a date object from a localist date string
   * We will always default to timezone registered by localist (pacifictime)
   * so we can ignore the timezone in the string, and use UTC methods for constructing datetime
   */
  dateFromLocalist(localistDateTime){
    let d = null;
    if ( !localistDateTime ) return d;
    try {
      const arr = localistDateTime.split(' ');
      d = new Date(`${arr[0]}T${arr[1]}Z`);
      if ( isNaN(d.getTime()) ) d = null;
    } catch (error) {
      d = null;
    }
    return d;
  }

  /**
   * @description Returns date object from an ISO date string - without time. assumes UTC
   * @param {String} isoDate - xxxx-xx-xx
   * @returns {Date | null}
   */
  dateFromIsoDate(isoDate){
    let d = null;
    if ( !isoDate ) return d;
    d = isoDate.split('T')[0];
    d = new Date(`${isoDate}T00:00:00Z`);
    if ( isNaN(d.getTime()) ) d = null;
    return d;
  }

  getDayOfWeek(date, short=false){
    const day = date.getUTCDay();
    return short ? this._dayOfWeek[day].short : this._dayOfWeek[day].long;
  }

  getMonth(date, short=false){
    const month = date.getUTCMonth();
    return short ? this._months[month].short : this._months[month].long;
  }

  getTime(date){
    let hours = date.getUTCHours();
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return { hours, ampm, minutes };
  }

  getDateString(startDate, endDate, hideTime){
    if (!startDate) return '';
    const isSingleDay = !endDate || startDate.toDateString() === endDate.toDateString();

    const startDay = this.getDayOfWeek(startDate);
    const startMonth = this.getMonth(startDate);
    const startDateStr = startDate.getUTCDate();
    const startYear = startDate.getUTCFullYear();
    let startTime = this.getTime(startDate);

    if ( isSingleDay ) {
      let time = `${startTime.hours}:${startTime.minutes}`;
      if ( endDate ) {
        const endTime = this.getTime(endDate);
        if ( startTime.ampm !== endTime.ampm ) {
          time += startTime.ampm;
        }
        time += ` - ${endTime.hours}:${endTime.minutes}${endTime.ampm}`;

      } else if ( time === '12:00') {
        time = ''; // all day event
      } else {
        time += startTime.ampm;
      }

      return `${startMonth} ${startDateStr}, ${startYear} ${time && !hideTime ? '| ' + time : ''}`;
    }

    // multi-day event
    const endDay = this.getDayOfWeek(endDate);
    const endMonth = this.getMonth(endDate);
    const endDateStr = endDate.getUTCDate();
    const endYear = endDate.getUTCFullYear();
    const endTime = this.getTime(endDate);

    let sd = `${startMonth} ${startDateStr}, ${startYear}`;
    let st = hideTime ? '' : `${startTime.hours}:${startTime.minutes}${startTime.ampm}`;
    const startString = `${sd}${st ? `, ${st}`: ''}`;

    const ed = `${endMonth} ${endDateStr}, ${endYear}`;
    const et = hideTime ? '' : `${endTime.hours}:${endTime.minutes}${endTime.ampm}`;
    const endString = `${ed}${et ? `, ${et}`: ''}`;
    return `${startString} - ${endString}`;
  }

}

export default new DatetimeUtils();
