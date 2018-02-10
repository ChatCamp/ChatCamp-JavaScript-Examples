import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { ConnectedRouter as Router } from 'react-router-redux';
import {isLoggedIn, getAppId} from 'state/auth/selectors'
import { PersistGate } from 'redux-persist/integration/react'
import ChatApp from 'containers/ChatApp'
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
  //   console.log("appId", appId)
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

    const appId = getAppId(store.getState())
    // const authProtection = this.authCheck.bind(this);
    // const routesWithAuthProtection = routes(authProtection, appId);

    // key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
    // return(
    //   <div>{this.props.client.messages.map(a => a.text)}</div>
    // )
    return (
      <Provider key={Math.random()} store={store}>
        <PersistGate loading={null} persistor={persistor}>
        {/* <Router key={Math.random()} history={history}> */}
          <ChatApp key={Math.random()} appId={"iFlyChatAppDiv"}/>
        {/* </Router> */}
      </PersistGate>
      </Provider>
    );
  }
}
