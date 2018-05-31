import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import ChatApp from 'containers/ChatApp'
import Utility from 'utility/Utility'
import {
  GROUP_CHANNELS_CLOSE, SMART_CHAT_CLOSE
} from 'state/action-types'
import * as Debug from 'debug';
const debug = Debug('chatcamp:Root')
export default class Root extends Component {
  // static propTypes = {
  //   store: PropTypes.object,
  //   history: PropTypes.object,
  //   routes: PropTypes.func
  // }

  // /**
  //    * Checks Auth logic. Is user allowed to visit certain path?
  //    * @param  {String} path next path to visit
  //    * @return {Bool} is user allowed to visit next location?
  //    * check RouteAuth component.
  //    */
  // authCheck(path) {
  //   const {store} = this.props
  //   const loggedIn = isLoggedIn(store.getState())
  //   const appId = getAppId(store.getState())
  //   const allowedAnonymousToVisitPath = ['/auth', '/register']
  //   debug("appId", appId)
  //   // if(appId === null) {
  //   //   return false
  //   // } else if (loggedIn && allowedAnonymousToVisitPath.includes(path)) {
  //   //   return false
  //   // } else if (!loggedIn && !allowedAnonymousToVisitPath.includes(path)) {
  //   //   return false
  //   // }
  //
  //   if (loggedIn && allowedAnonymousToVisitPath.includes(path)) {
  //     return false
  //   } else if (!loggedIn && !allowedAnonymousToVisitPath.includes(path)) {
  //     return false
  //   }
  //
  //   return true;
  // }
  // componentDidMount() {
  //      this.persistor.dispatch({ type: REHYDRATE });
  //  }

  render() {
    const {
      storePersistor
      // history,
      // routes
    } = this.props;
    let store = storePersistor.store
    let persistor = storePersistor.persistor

    const onBeforeLift = () => {
      // take some action before the gate lifts. store has hydrated but app is not loaded yet
      let appId = process.env.REACT_APP_CHATCAMP_APP_ID

      if(Utility.getUrlQueryParams(window.location.href)['appId'] && Utility.getUrlQueryParams(window.location.href)['appId'][0]) {
        appId = Utility.getUrlQueryParams(window.location.href)['appId'][0]
      }

      let userId;
      if(window.ChatCampData && window.ChatCampData.userId){
        userId = window.ChatCampData.userId
      }
      if(Utility.getUrlQueryParams(window.location.href)['userId'] && Utility.getUrlQueryParams(window.location.href)['userId'][0]) {
        userId = Utility.getUrlQueryParams(window.location.href)['userId'][0]
      }

      // if user id or app id doesnt match then delete the groupchannelsState
      if(store.getState().user.get("id", false)){
        debug("start user id"+ store.getState().user.get("id", false))
        if(userId !== store.getState().user.get("id") || appId !== store.getState().user.get("appId") || Utility.mobileCheck()){
          let storeChannels = store.getState().groupChannelsState.keySeq().toArray()
          for(let i in storeChannels)
          store.dispatch({
            type: GROUP_CHANNELS_CLOSE,
            groupChannelsId: storeChannels[i]
          })
          store.dispatch({
            type: SMART_CHAT_CLOSE
          })
        }
      }
      
    }
    // const authProtection = this.authCheck.bind(this);
    // const routesWithAuthProtection = routes(authProtection, appId);

    // key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
    // return(
    //   <div>{this.props.client.messages.map(a => a.text)}</div>
    // )
    return (
      <Provider key={Math.random()} store={store}>
        <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
        {/* <Router key={Math.random()} history={history}> */}
          <ChatApp key={Math.random()} appId={"iFlyChatAppDiv"}/>
        {/* </Router> */}
      </PersistGate>
      </Provider>
    );
  }
}
