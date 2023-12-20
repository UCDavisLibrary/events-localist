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
   */
  dateFromLocalist(localistDateTime){
    let d = null;
    try {
      const arr = localistDateTime.split(' ');
      d = new Date(`${arr[0]}T${arr[1]}${arr[2]}`);
      if ( isNaN(d.getTime()) ) d = null;
    } catch (error) {
      d = null;
    }
    return d;
  }

  getDayOfWeek(date, short=false){
    const day = date.getDay();
    return short ? this._dayOfWeek[day].short : this._dayOfWeek[day].long;
  }

  getMonth(date, short=false){
    const month = date.getMonth();
    return short ? this._months[month].short : this._months[month].long;
  }

  getTime(date){
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return { hours, ampm, minutes };
  }

}

export default new DatetimeUtils();
