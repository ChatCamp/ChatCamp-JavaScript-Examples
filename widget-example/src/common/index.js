import * as React from 'react';
// Devtools
import { composeWithDevTools } from 'redux-devtools-extension';
// Redux stuff
import thunk from 'redux-thunk';
import {iFlyMiddleWare} from 'middlewares'
import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
// Application
import { rootReducer } from 'reducers';
import Root from 'components/Root';
// import Chat from 'components/Chat';
// import { Routing, history } from 'routing';

export const configureStore = initialState => {
  // const routerMiddlewareApplied = applyMiddleware(routerMiddleware(history));
  const thunkApplied = applyMiddleware(thunk);
  const iFlyMiddleWareApplied = applyMiddleware(iFlyMiddleWare);
  let middlewares = null;

  if (process.env.NODE_ENV === 'development') {
    middlewares = composeWithDevTools(thunkApplied, iFlyMiddleWareApplied);
  } else {
    middlewares = compose(thunkApplied, iFlyMiddleWareApplied);
  }

  return createStore(rootReducer, initialState, middlewares);
};

export const configureRootComponent = store => {
  const propsRoot = {
    // routes: Routing,
    // history,
    store
  };

  return <Root {...propsRoot} />;
};

// export const configureChatComponent = store => {
//   const propsRoot = {
//     routes: Routing,
//     history,
//     store
//   };
//
//   return <Chat {...propsRoot} />;
// };
