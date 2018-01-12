import chatcamp from 'chatcamp'
import Utility from 'utility/Utility';
// let devMode = false;
// let logLevel = iflychat.Constants.LOG.ERROR;
// if (process.env.NODE_ENV !== 'production') {
//   devMode = true;
//   logLevel = iflychat.Constants.LOG.DEBUG;
// }

let appId = process.env.REACT_APP_CHATCAMP_APP_ID

if(Utility.getUrlQueryParams(window.location.href)['appId'] && Utility.getUrlQueryParams(window.location.href)['appId'][0]) {
  appId = Utility.getUrlQueryParams(window.location.href)['appId'][0]
}


const cc = new chatcamp({
  appId: appId
})
window.cc = cc
// TODO: Find a better method of sharing class instance
export default cc
