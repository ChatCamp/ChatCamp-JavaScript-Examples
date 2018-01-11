import chatcamp from 'chatcamp'
// let devMode = false;
// let logLevel = iflychat.Constants.LOG.ERROR;
// if (process.env.NODE_ENV !== 'production') {
//   devMode = true;
//   logLevel = iflychat.Constants.LOG.DEBUG;
// }

const cc = new chatcamp({
  appId: process.env.REACT_APP_CHATCAMP_APP_ID
})
window.cc = cc
// TODO: Find a better method of sharing class instance
export default cc
