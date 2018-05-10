import ReactDOM from 'react-dom'
import React from 'react'
// import './index.css';
import Immutable from 'immutable'
import { configureStore, configureRootComponent, configureChatComponent } from 'common'
// import {history} from 'routing'
// import en from 'react-intl/locale-data/en'
// import Translations from 'utility/Translations'
import registerServiceWorker from './registerServiceWorker';
// import {addLocaleData} from 'react-intl'
// import actions from 'actions/chat'
import client from 'Client'
// import IFlyProvider from 'providers/iFlyProvider';

// import ChatAppInit from 'utility/ChatAppInit'
import Utility from 'utility/Utility'
// import iFlyChatChatSdk from 'modules/iflychat-chat-sdk'
// import iFlyChatChatSdkUi from 'modules/iflychat-chat-sdk-ui'
// import UnicodeToImg from 'utility/UnicodeToImg'
// import ProcessMessage from 'utility/ProcessMessage'
// import iflyEvents from './iflyEvents'

// Styles
// import 'semantic/dist/semantic.min.css';
// import 'styles/index.css';

// addLocaleData(en);

// window.BASE_API = 'http://localhost:4000/api/v1';
if (process.env.NODE_ENV !== 'production') {
  window.BASE_API = 'http://localhost:9080';
}
else {
  window.BASE_API = 'https://api.iflychat.com:443';
}

if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_PERF === 'true') {
  const {whyDidYouUpdate} = require('why-did-you-update')
    let createClass = React.createClass;
    Object.defineProperty(React, 'createClass', {
      set: (nextCreateClass) => {
        createClass = nextCreateClass;
      }
    });

  // whyDidYouUpdate(React)
}

export const initialState = {
  user: Immutable.fromJS({
    name: "User Name",
    id: "0",
    avatarUrl: "//cdn.iflychat.com/img/default_avatar.png",
    profileUrl: "javascript:void(0)",
    role: Immutable.Map({}),
    userColor: "#0000FF",
    // mobileDevice: Utility.mobileCheck()
  }),
  messages: Immutable.OrderedMap({}),

  threads: Immutable.fromJS({

  }),
  groupChannels: Immutable.fromJS({

  }),
};

// let popup = ChatAppInit.addPopUpChatToState(initialState);
// let embedRoom = ChatAppInit.addEmbedRoomsToState(initialState);
// let embedApp = ChatAppInit.addEmbedAppsToState(initialState);
// let widget = ChatAppInit.addWidgetAppToState(initialState);
// let widgetOnlineUserCount = ChatAppInit.addWidgetOnlineUserCountToState(initialState);
// let widgetOnlineUserList = ChatAppInit.addWidgetOnlineUserListToState(initialState);
// let oldEmbedRoom = ChatAppInit.addOldEmbedRoomsToState(initialState);
//
// initialState.apps = Immutable.fromJS(initialState.apps);
// console.log(initialState.apps)
// if(popup === true || embedRoom === true || embedApp === true || widget === true || widgetOnlineUserCount === true || widgetOnlineUserList === true || oldEmbedRoom === true){
//   // iFlyChatChatSdk.chatConnect();
// }

export const store = configureStore(initialState);

// if(history.location.pathname === '/chat') {
//   const ChatComponent = configureChatComponent(store);
//   let lang = 'en';
//
//   //iFlyChat 3.0 entry point //TODO
//   ReactDOM.render(ChatComponent, document.getElementsByClassName("iflychat-popup")[0]);
// } else {
  // const RootComponent = configureRootComponent(store);

  const RootComponent = configureRootComponent(store);
  ReactDOM.render(<div className="cc-root">{RootComponent}</div>, document.getElementById('cc-app'));

  var el = document.getElementById('cc-app');
  if(el) {
    el.className = Utility.mobileCheck() ? 'cc-app-mobile' : 'cc-app-desktop';
  }
  // ReactDOM.render(<IFlyProvider client={client}>{RootComponent}</IFlyProvider>, document.getElementById('app'));

// }
registerServiceWorker();
