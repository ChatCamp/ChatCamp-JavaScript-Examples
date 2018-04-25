let _Utility = {};
 _Utility.soundObject = []
 _Utility.soundObject['1'] = '//cdn.iflychat.com/sound/incoming.mp3';
 _Utility.soundObject['2'] = '//cdn.iflychat.com/sound/stumble.mp3';
 _Utility.soundObject['3'] = '//cdn.iflychat.com/sound/bloom.mp3';
 _Utility.soundObject['4'] = '//cdn.iflychat.com/sound/hope.mp3';
 _Utility.soundObject['5'] = '//cdn.iflychat.com/sound/jump_up.mp3';
 _Utility.soundObject['6'] = '//cdn.iflychat.com/sound/looking_down.mp3';
 _Utility.isOldTitle = true;
 _Utility.oldTitle = document.title;
 _Utility.interval = null;
 _Utility.spamInterval = null;
 _Utility.spamTimeCheck = 1;

let _iFlyUserAuth = {};
 _iFlyUserAuth.capabilityArr = {};
 _iFlyUserAuth.capabilityArr['access-chat'] = {};
 _iFlyUserAuth.capabilityArr['send-message'] = {};
 _iFlyUserAuth.capabilityArr['user-moderation'] = {};
 _iFlyUserAuth.capabilityArr['access-dashboard'] = {};
 _iFlyUserAuth.capabilityArr['set-username'] = {};
 _iFlyUserAuth.capabilityArr['access-chat']['viewer'] = true;
 _iFlyUserAuth.capabilityArr['access-chat']['participant'] = true;
 _iFlyUserAuth.capabilityArr['access-chat']['moderator'] = true;
 _iFlyUserAuth.capabilityArr['access-chat']['admin'] = true;
 _iFlyUserAuth.capabilityArr['send-message']['viewer'] = false;
 _iFlyUserAuth.capabilityArr['send-message']['participant'] = true;
 _iFlyUserAuth.capabilityArr['send-message']['moderator'] = true;
 _iFlyUserAuth.capabilityArr['send-message']['admin'] = true;
 _iFlyUserAuth.capabilityArr['user-moderation']['viewer'] = false;
 _iFlyUserAuth.capabilityArr['user-moderation']['participant'] = false;
 _iFlyUserAuth.capabilityArr['user-moderation']['moderator'] = true;
 _iFlyUserAuth.capabilityArr['user-moderation']['admin'] = true;
 _iFlyUserAuth.capabilityArr['access-dashboard']['viewer'] = false;
 _iFlyUserAuth.capabilityArr['access-dashboard']['participant'] = false;
 _iFlyUserAuth.capabilityArr['access-dashboard']['moderator'] = false;
 _iFlyUserAuth.capabilityArr['access-dashboard']['admin'] = true;
 _iFlyUserAuth.capabilityArr['set-username']['viewer'] = false;
 _iFlyUserAuth.capabilityArr['set-username']['participant'] = false;   //check uid before true
 _iFlyUserAuth.capabilityArr['set-username']['moderator'] = false;
 _iFlyUserAuth.capabilityArr['set-username']['admin'] = false;
 _iFlyUserAuth.roleArr = ['viewer', 'participant', 'moderator', 'admin'];
_iFlyUserAuth.checkGuest = function (id) {
  if (id.split('-')[0] === '0') {
    return true;
  } else {
    return false;
  }
}

let _timeout = {};
_timeout.IDLE_TIMEOUT = 600; //seconds
_timeout.idleSecondsTimer = null;
_timeout.idleSecondsCounter = 0;
_timeout.oldPollInterval = 120000;
_timeout.newPollInterval = 600000;
_timeout.oldStatus = '1';
// _timeout.checkIdleTime = function(store, actions) {
//    _timeout.idleSecondsCounter++;
//   if (_timeout.idleSecondsCounter >= _timeout.IDLE_TIMEOUT && store.getState('user').user.get('status') !== '5') {
//     _timeout.oldStatus = store.getState('user').user.get('status');
//     store.dispatch(actions.setStatus('5'));
//     iFlyChatChatSdk.setStatus({status:'5'});
//     iFlyChatChatSdk.setPollInterval(_timeout.newPollInterval);  // set userlist polling interval
//   }
// };

let Utility = {
  mobileCheck: function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  },

  getUrlHashParams : function (url) {
    var params = {}, nv, n, v;
    var hashes = url.slice(url.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        nv = hashes[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);
        if (!params.hasOwnProperty(n)) {
          params[n] = [];
        }
        params[n].push(nv.length === 2 ? v : null);
    }
    return params;
  },

  getUrlQueryParams : function (url) {
    var queryStart = url.indexOf("?") + 1;
    var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
    var query = url.slice(queryStart, queryEnd - 1);
    var pairs = query.replace(/\+/g, " ").split("&");
    var params = {}, i, n, v, nv;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=");
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!params.hasOwnProperty(n)) {
        params[n] = [];
      }

      params[n].push(nv.length === 2 ? v : null);
    }
    return params;
  },

  playSound: function(soundType){
    let soundFile = [];
    if(soundType !== '0'){
      soundFile = new Audio(_Utility.soundObject[soundType])
      return soundFile.play();
    }
    else{
      return false;
    }
  },
  generateRandomId: function() {
    return Math.floor((Math.random() * 10000) + 1)
  },
  // checkIfGroupChat: function(id) {
  //   return (id.substring(0,2) === 'p-')
  // },
  changeTitle: function(name, newTitle) {
    if (typeof newTitle !== 'string') {
      newTitle = newTitle.join(' ')
    }
    newTitle = name + ' says: ' + newTitle.substring(0,8) + '...';  //'says' can be translated
    if(_Utility.interval !== null) {
      clearInterval(_Utility.interval);
      _Utility.interval = null;
      document.title = _Utility.oldTitle;
      _Utility.interval = setInterval(() => {
        document.title = _Utility.isOldTitle ? _Utility.oldTitle : newTitle;
        _Utility.isOldTitle = !_Utility.isOldTitle;
      }, 2000);
    }
    else {
      _Utility.interval = setInterval(() => {
        document.title = _Utility.isOldTitle ? _Utility.oldTitle : newTitle;
        _Utility.isOldTitle = !_Utility.isOldTitle;
      }, 2000);
    }
  },
  clearTitle: function() {
    clearInterval(_Utility.interval);
    _Utility.interval = null;
    document.title = _Utility.oldTitle;
  },
  // spamCheckInterval: function() {
  //   if(_Utility.spamInterval === null) {
  //     _Utility.spamInterval = setInterval(() => {
  //       _Utility.spamTimeCheck = _Utility.spamTimeCheck - 4;
  //       if(_Utility.spamTimeCheck < 1) { _Utility.spamTimeCheck = 1; }
  //     }, 4000);
  //   }
  // },
  // spamCheck: function() {
  //   if(_Utility.spamTimeCheck < 5) {
  //     _Utility.spamTimeCheck++;
  //     return false;
  //   }
  //   else {
  //     _Utility.spamTimeCheck = 20;
  //     alert("Please don't spam");
  //     return true;
  //   }
  // },
  // isIos: function(){
  //   return  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  // },
  // checkUserAccess: function(capability, chatRole, uid){
  //   if(capability === 'access-chat' || capability === 'send-message' || capability === 'user-moderation' || capability === 'access-dashboard' || capability === 'set-username') {
  //     if(chatRole === '0' || chatRole === '1' || chatRole === '2' || chatRole === '3') {
  //       let role = _iFlyUserAuth.roleArr[chatRole];
  //       if(capability === 'set-username' && role === 'participant') {
  //         return _iFlyUserAuth.checkGuest(uid);
  //       }
  //       return _iFlyUserAuth.capabilityArr[capability][role];
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // },
  //
  // getDeviceClass: function(device){
  //   if(device === '0'){
  //     return 'iflychat-icon-mobile'
  //   }else if(device === '1'){
  //     return 'iflychat-icon-laptop'
  //   }
  //   else{
  //     return 'iflychat-icon-laptop'
  //   }
  // },
  //
  // getStatusClass: function(status){
  //   if(status === '1'){
  //     return 'ifc-available'
  //   }
  //   else if(status === '3'){
  //     return 'ifc-busy'
  //   }
  //   else if(status === '2'){
  //     return 'ifc-idle'
  //   }
  //   else if(status === '5'){
  //     return 'ifc-idle'
  //   }
  //   else if(status === '4'){
  //     return 'ifc-offline'
  //   }
  //   else{
  //     return 'ifc-available'
  //   }
  // },
  // setIdleTimeout: function(store, actions) {
  //   if(_timeout.idleSecondsTimer === null) {
  //     _timeout.oldPollInterval = iFlyChatChatSdk.getPollInterval();  // get old userlist polling interval
  //     _timeout.idleSecondsTimer = window.setInterval(_timeout.checkIdleTime, 1000, store, actions);
  //     _timeout.idleSecondsCounter = 0;
  //   }
  // },
  // resetIdleTimeout: function(store, actions) {
  //   _timeout.idleSecondsCounter = 0;
  //   if(store.getState('user').user.get('status') === '5') {
  //     store.dispatch(actions.setStatus(_timeout.oldStatus));
  //     iFlyChatChatSdk.setStatus({status: _timeout.oldStatus});
  //     if(typeof _timeout.oldPollInterval !== 'undefined') {
  //       iFlyChatChatSdk.setPollInterval(_timeout.oldPollInterval);  // set userlist polling interval
  //     } else {
  //       iFlyChatChatSdk.setPollInterval(120000);
  //     }
  //   }
  // },
  // setOldStatus: function(status) {
  //   _timeout.oldStatus = status;
  // },
  // getPollTimeInterval: function() {
  //   return _timeout.newPollInterval;
  // },
  // getDefaultHeaderBackground: function() {
  //   let configDetails = iFlyChatChatSdk.getConfigDetails();
  //   if(configDetails.chatHeaderBackgroundColor) {
  //     return configDetails.chatHeaderBackgroundColor;
  //   } else {
  //     return '#222222';
  //   }
  // },
  // getDefaultHeaderText: function() {
  //   let configDetails = iFlyChatChatSdk.getConfigDetails();
  //   if(configDetails.chatHeaderTextColor) {
  //     return configDetails.chatHeaderTextColor;
  //   } else {
  //     return '#FFFFFF';
  //   }
  // },
  // showResetWindowSizeButton: function(threadID){
  //   if(iFlyChatChatSdkUi.getWindowSize(threadID,'h') || iFlyChatChatSdkUi.getWindowSize(threadID,'w')){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // },
  // getDefaultListWidth: function() {
  //   let width = 256; //px
  //   return width;
  // },
  // handleAvatar: function(message, chatSettings) {
  //   let avatarUrl = message.get('fromAvatarUrl');
  //   if(typeof avatarUrl === 'undefined') {
  //     avatarUrl = "//cdn.iflychat.com/img/default_avatar.png";
  //   }
  //   if(!avatarUrl || avatarUrl.match(/default_avatar/g)) {
  //     // return (<FirstLetterAvatar customClass="ifc-chat-window-message-avatar-img" name={message.get('fromName')} id={message.get('fromId')} guestPrefix={chatSettings.get('guestPrefix')} size="24"/>)
  //   }
  //   else {
  //     return (<img alt="avatar" className="ifc-chat-window-message-avatar-img" src={avatarUrl} />)
  //   }
  // },
  // handlePopoverPosition: function(target) {
  //   if(target) {
  //     let comp = target;
  //     let rect = comp.getBoundingClientRect();
  //     if(rect.top >= 390) {
  //       return "top"
  //     } else {
  //       return "bottom"
  //     }
  //   }
  // },
  // getMessageLimit: function(windowStatus) { // Returns message limit after which message history starts getting deleted from store
  //   if(windowStatus === 'windowOpen') {
  //     let msgLimit = 200;
  //     if(this.mobileCheck()) {
  //       return msgLimit/2;
  //     } else {
  //       return msgLimit;
  //     }
  //   } else if (windowStatus === 'windowClosed') {
  //     return 15;
  //   } else {
  //     return 15;
  //   }
  // },
  // adjustDragXHeight: function(dragXDiv, chatComponentDiv, divName) { // Adjusts height of drag X component for chatlist and chatwindow
  //   if(chatComponentDiv) {
  //     let height = chatComponentDiv.clientHeight;
  //     if(dragXDiv && height && chatComponentDiv.className === divName && height !== dragXDiv.clientHeight) {
  //       dragXDiv.style.height = height + 'px';
  //     }
  //   }
  // },
  // handleOpenDashboard(userToken) {
  //   let dashboardDetails = iFlyChatChatSdk.getDashboardDetails();
  //   let appDashbordUrl = "https://"+dashboardDetails.dashboardURL+"/apps/dashboard/#/rooms/list?sessid=" + userToken + "&hostName="+dashboardDetails.dashboardHost+"&hostPort="+dashboardDetails.dashboardPort+"&ref=iflychatapp";
  //
  //   window.open(appDashbordUrl)
  //   /*set state to open dashboard in modal*/
  //   /*this.setState({ showAppDashboard: true })*/
  // }
};

export default Utility;
