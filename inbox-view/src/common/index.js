import * as React from 'react';
// Devtools
import { composeWithDevTools } from 'redux-devtools-extension';
// Redux stuff
import thunk from 'redux-thunk';
import {iFlyMiddleWare} from 'middlewares'
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage'

// import { routerMiddleware } from 'react-router-redux';
// Application
import { rootReducer } from 'reducers';
import Root from 'components/Root';
// import Chat from 'components/Chat';
// import { Routing, history } from 'routing';
const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  whitelist: ['groupChannelsState', 'user']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

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
  let store = createStore(persistedReducer, initialState , middlewares)
  let persistor = persistStore(store)

  if (module.hot) {
      module.hot.accept(() => {
        // This fetch the new state of the above reducers.
        const nextRootReducer = rootReducer
        store.replaceReducer(
          persistReducer(persistConfig, nextRootReducer)
        )
      })
  }

  return {store, persistor}
};

export const configureRootComponent = storePersistor => {
  const propsRoot = {
    // routes: Routing,
    // history,
    storePersistor
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
