// make utility classes

// import Constants from '../HelperComponents/i18nMessages/Constants'

let _UtilityTime = {};

_UtilityTime.getTimeTwelveHour = function(millis) {
  var ct = new Date();
  var ctime = new Date(millis);
  var date = ctime.getDate();
  var month = (ctime.getMonth())+1;
  var minute = ctime.getMinutes();
  var hour = ctime.getHours();
  minute = (minute<10 ? '0':'') + minute;
  date = (date<10 ? '0':'') + date;
  var ampm = '';
  if (hour > 12 && hour < 24) {
    hour = hour - 12;
    ampm = 'PM'
  } else if (hour === 12 && minute > 0) {
    ampm = 'PM'
  } else if (hour === 24 ) {
    hour = hour - 24;
    ampm = 'AM'
  } else {
    ampm = 'AM'
  }
  hour = (hour<10 ? '0':'') + hour;
  var time = ''
  if((ct.getDate() === ctime.getDate()) && (ct.getMonth() === ctime.getMonth())) {
    return time = (hour+':'+minute+ampm);
  }
  else {
    return time = (month+'/'+date+' '+hour+':'+minute+ampm);
  }
};
_UtilityTime.getTimeTwentyFourHour = function(millis) {
  var ct = new Date();
  var ctime = new Date(millis);
  var date = ctime.getDate();
  var month = (ctime.getMonth())+1;
  var minute = ctime.getMinutes();
  var hour = ctime.getHours();
  minute = (minute<10 ? '0':'') + minute;
  date = (date<10 ? '0':'') + date;

  hour = (hour<10 ? '0':'') + hour;
  var time = ''
  if((ct.getDate() === ctime.getDate()) && (ct.getMonth() === ctime.getMonth())) {
    return time = (hour+':'+minute);
  }
  else {
    return time = (month+'/'+date+' '+hour+':'+minute);
  }
};
_UtilityTime.timeSince = function(date,relativeFormat) {

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
      intervalType = 'year';
  } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
          intervalType = 'month';
      } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
              intervalType = 'day';
          } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                  intervalType = "hour";
              } else {
                  interval = Math.floor(seconds / 60);
                  if (interval >= 1) {
                      intervalType = "min";
                  } else {
                      interval = seconds;
                      intervalType = "second";
                  }
              }
          }
      }
  }

  if (interval > 1) {
      intervalType += 's';
  }
  intervalType+= ' ago';

  if(intervalType === "seconds ago" || intervalType === "second ago"){
    interval = 'just'
    intervalType = 'now'
  }

  var relativeTime = interval + ' ' + intervalType;
  if(intervalType.indexOf("now") > -1) {
    relativeTime = "Just Now";
  } else if(intervalType.indexOf("year") > -1) {
    if(intervalType.indexOf("years") > -1) {
      relativeTime = "Years Ago"
    } else {
      relativeTime = "Year Ago"
    }
  } else if(intervalType.indexOf("month") > -1) {
    if(intervalType.indexOf("months") > -1) {
      relativeTime = "Months Ago"
    } else {
      relativeTime = "a Month Ago"
    }
  } else if(intervalType.indexOf("day") > -1) {
    if(intervalType.indexOf("days") > -1) {
      relativeTime = "Days Ago"
    } else {
      relativeTime = "a Day Ago"
    }
  } else if(intervalType.indexOf("hour") > -1) {
    if(intervalType.indexOf("hours") > -1) {
      relativeTime = "Hours Ago"
    } else {
      relativeTime = "an Hour Ago"
    }
  } else if(intervalType.indexOf("minute") > -1) {
    if(intervalType.indexOf("minutes") > -1) {
      relativeTime = "Minutes Ago"
    } else {
      relativeTime = "a Minute Ago"
    }
  }

  if(relativeFormat === 'short'){
    // console.log('relativeformat inside')
    return interval + intervalType[0];
  } else{
    return relativeTime;
  }

};

let UtilityTime = {

  getTime:function(format,time,relativeFormat){
      if(format === '1'){
        return _UtilityTime.getTimeTwelveHour(time)
      }
      else if (format === '3'){
        return _UtilityTime.timeSince(time,relativeFormat)
      }
      else if (format === '2'){
        return _UtilityTime.getTimeTwentyFourHour(time)
      }
  },

};

export default UtilityTime;
